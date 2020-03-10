import { getRepository, Repository } from 'typeorm';
import { gql } from 'apollo-server-express';

import User from '../database/entity/User';
import { catchDBError } from '@Lib/error';

export const typeDef = gql`
  type User {
    id: String!
    email: String!
    password: String!
    name: String!
  }

  type Query {
    user(name: String): User!
    users: [User]!
  }

  type Mutation {
    createUser(email: String, password: String, name: String): User!
    updateUser(past_email: String, email: String, name: String, password: String): User!
    deleteUser(email: String, name: String, password: String): Boolean!
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any, { name }: { name: User['name'] }) => {
      const repo: Repository<User> = getRepository(User);
      const user: User = await repo
        .findOne({
          where: {
            name
          }
        })
        .catch(catchDBError());

      if (!user) {
        throw new Error('Not Found User');
      }

      return user;
    },
    users: async () => {
      const repo: Repository<User> = getRepository(User);
      const user: User[] = await repo.find().catch(catchDBError());

      return user;
    }
  },
  Mutation: {
    createUser: async (
      _,
      {
        email,
        password,
        name
      }: {
        email: User['email'];
        password: User['password'];
        name: User['name'];
      }
    ) => {
      const repo: Repository<User> = getRepository(User);

      const user: User = await repo
        .save({
          email,
          name,
          password
        })
        .catch(catchDBError());

      return user;
    },
    updateUser: async (
      _: any,
      {
        past_email,
        email,
        password,
        name
      }: {
        past_email: User['email'];
        email: User['email'];
        password: User['password'];
        name: User['name'];
      }
    ) => {
      const repo: Repository<User> = getRepository(User);

      const user: User = await repo
        .findOne({
          where: {
            past_email
          }
        })
        .catch(catchDBError());

      if (!user) {
        throw new Error('Not Found User');
      }

      Object.assign(user, { email, password, name });

      await repo.save(user).catch(catchDBError());

      return user;
    },
    deleteUser: async (
      _: any,
      {
        email,
        name,
        password
      }: {
        email: User['email'];
        name: User['name'];
        password: User['password'];
      }
    ) => {
      const repo: Repository<User> = getRepository(User);

      const user: User = await repo
        .findOne({
          where: {
            email,
            name
          }
        })
        .catch(catchDBError());

      if (!user) {
        throw new Error('Not Found User');
      }

      if (user.password !== password) {
        throw new Error('Invalid Password');
      }

      await repo.delete(user).catch(catchDBError());

      return true;
    }
  }
};
