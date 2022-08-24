import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

import resolvers from '../resolvers';

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name   : 'Query',
    fields : {
      scrape : {
        type : resolvers.HTMLPage,
        // `args` describes the arguments that the `scrape` query accepts
        args : {
          url : { type: GraphQLString },
        },
        resolve(_, { url }) {
          return {
            url
          };
        },
      },
    },
  }),
});

export default schema;
