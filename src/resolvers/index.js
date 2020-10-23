const { GraphQLObjectType, GraphQLString } = require('graphql');

const validAttributes = {
  id      : { type: GraphQLString },
  class   : { type: GraphQLString },
  src     : { type: GraphQLString },
  content : { type: GraphQLString },
};

const validHTMLTags = [
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
  'article',
  'footer',
  'form',
  'input',
  'ul',
  'li',
];

const HtmlPage = new GraphQLObjectType({
  name   : 'HtmlPage',
  fields : () => ({}),
});

module.exports = {
  HtmlPage,
  validHTMLTags,
};
