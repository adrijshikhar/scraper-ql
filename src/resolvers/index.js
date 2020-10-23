const { GraphQLObjectType } = require('graphql');

const HtmlPage = new GraphQLObjectType({
  name   : 'HtmlPage',
  fields : () => ({}),
});

module.exports = {
  HtmlPage,
};
