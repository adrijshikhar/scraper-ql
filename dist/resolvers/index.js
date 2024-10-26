'use strict';
let __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const graphql_1 = require('graphql');
const constants_1 = require('./constants');
const content_resolver_1 = __importDefault(require('./content_resolver'));
const tag_resolver_1 = __importDefault(require('./tag_resolver'));
const image_resolver_1 = __importDefault(require('./image_resolver'));
const links_resolver_1 = __importDefault(require('./links_resolver'));
const url_resolver_1 = __importDefault(require('./url_resolver'));
const hostname_resolver_1 = __importDefault(require('./hostname_resolver'));
const title_resolver_1 = __importDefault(require('./title_resolver'));
const HTMLFields = () =>
  constants_1.validHTMLTags.reduce(
    (prev, tag) =>
      Object.assign(Object.assign({}, prev), {
        [tag]: {
          type: HTMLNode,
          args: Object.assign({}, constants_1.validAttributes),
          resolve: (root, args) => (0, tag_resolver_1.default)(root, args, tag)
        },
        content: {
          type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
          args: { filter: { type: graphql_1.GraphQLString, defaultValue: '*' } },
          resolve: content_resolver_1.default
        }
      }),
    constants_1.initialState.field
  );
const HTMLNode = new graphql_1.GraphQLObjectType({
  name: 'HTMLNode',
  fields: HTMLFields
});
const HTMLPage = new graphql_1.GraphQLObjectType({
  name: 'HTMLPage',
  fields: () =>
    Object.assign(Object.assign({}, HTMLFields()), {
      images: {
        type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
        resolve: image_resolver_1.default
      },
      url: {
        type: graphql_1.GraphQLString,
        resolve: url_resolver_1.default
      },
      links: {
        type: new graphql_1.GraphQLList(HTMLPage),
        args: { filter: { type: graphql_1.GraphQLString, defaultValue: '*' } },
        resolve: links_resolver_1.default
      },
      hostname: {
        type: graphql_1.GraphQLString,
        resolve: hostname_resolver_1.default
      },
      title: {
        type: graphql_1.GraphQLString,
        resolve: title_resolver_1.default
      }
    })
});
exports.default = {
  HTMLPage
};
//# sourceMappingURL=index.js.map
