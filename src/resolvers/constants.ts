import { GraphQLString } from 'graphql';

export const initialState = {
  field : {},
};

export const validHTMLTags = [
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
  'td',
];

export const validAttributes = {
  id      : { type: GraphQLString },
  class   : { type: GraphQLString },
  src     : { type: GraphQLString },
  content : { type: GraphQLString },
};
