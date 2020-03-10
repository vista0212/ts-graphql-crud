import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import * as user from './User';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: user.typeDef,
  resolvers: user.resolvers
});

export default schema;
