import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as graphqlHTTP from 'express-graphql';
import { createConnection } from 'typeorm';
import schema from './graphql/schema';
import connectionOptions from 'database';

dotenv.config();

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const root = { hello: () => 'Hello World!' };

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use((req, res, next) => {
  // err.status = 404;
  next(res.status(404).json({ success: false, message: 'Not Found' }));
});

createConnection(connectionOptions)
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

export default app;
