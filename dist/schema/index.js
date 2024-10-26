'use strict';
let __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const graphql_1 = require('graphql');
const resolvers_1 = __importDefault(require('../resolvers'));
const schema = new graphql_1.GraphQLSchema({
  query: new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
      scrape: {
        type: resolvers_1.default.HTMLPage,
        args: {
          url: { type: graphql_1.GraphQLString }
        },
        resolve(_, { url }) {
          return {
            url
          };
        }
      }
    }
  })
});
exports.default = schema;
//# sourceMappingURL=index.js.map
