'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validAttributes = exports.validHTMLTags = exports.initialState = void 0;
const graphql_1 = require('graphql');
exports.initialState = {
  field: {}
};
exports.validHTMLTags = [
  'div',
  'span',
  'img',
  'body',
  'a',
  'b',
  'i',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'article',
  'footer',
  'form',
  'input',
  'ul',
  'li',
  'ol',
  'table',
  'tr',
  'td'
];
exports.validAttributes = {
  id: { type: graphql_1.GraphQLString },
  class: { type: graphql_1.GraphQLString },
  src: { type: graphql_1.GraphQLString },
  content: { type: graphql_1.GraphQLString }
};
//# sourceMappingURL=constants.js.map
