import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import resolvers from '../resolvers/index.js';

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name   : 'Query',
    fields : {
      scrape : {
        type : resolvers.HtmlPage,
        // `args` describes the arguments that the `scrape` query accepts
        args : {
          url : { type: GraphQLString }
        },
        resolve (_, { url }) {
          return {
            url
          };
        }
      }
    }
  }),
});

export default schema;