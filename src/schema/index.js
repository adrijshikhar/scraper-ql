import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { HtmlPage } from '../resolvers';

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name   : 'Query',
    fields : {
      scrape : {
        type : HtmlPage,
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