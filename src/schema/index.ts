import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

import resolvers from '../resolvers';
import MethodType from '../schema/MethodType';

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name   : 'Query',
    fields : {
      scrape : {
        type : resolvers.HTMLPage,
        // `args` describes the arguments that the `scrape` query accepts
        args : {
          url           : { type: GraphQLString },
          authorization : { type: GraphQLString },
          method        : { type: MethodType, defaultValue: MethodType.getValue("GET") },
        },
        resolve(_, { url, authorization, method }) {
          return {
            url, authorization, method
          };
        },
      },
    },
  }),
});

export default schema;
