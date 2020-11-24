import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { initialState, validHTMLTags, validAttributes } from './constants';
import contentResolver from './content_resolver';
import tagResolver from './tag_resolver';
import imageResolver from './image_resolver';
import linksResolver from './links_resolver';
import urlResolver from './url_resolver';
import hostnameResolver from './hostname_resolver';
import titleResolver from './title_resolver';

const HTMLFields = () =>
  validHTMLTags.reduce(
    (prev, tag) => ({
      ...prev,
      [tag] : {
        type : HTMLNode,
        args : {
          ...validAttributes,
        },
        resolve : (root, args) => tagResolver(root, args, tag),
      },
      content : {
        type    : new GraphQLList(GraphQLString),
        args    : { filter: { type: GraphQLString, defaultValue: '*' } },
        resolve : contentResolver,
      },
    }),
    initialState.field
  );

const HTMLNode = new GraphQLObjectType({
  name   : 'HTMLNode',
  fields : HTMLFields,
});

const HTMLPage = new GraphQLObjectType({
  name   : 'HTMLPage',
  fields : () => ({
    ...HTMLFields(),
    images : {
      type    : new GraphQLList(GraphQLString),
      resolve : imageResolver,
    },
    url : {
      type    : GraphQLString,
      resolve : urlResolver,
    },
    links : {
      type    : new GraphQLList(HTMLPage),
      resolve : linksResolver,
    },
    hostname : {
      type    : GraphQLString,
      resolve : hostnameResolver,
    },
    title : {
      type    : GraphQLString,
      resolve : titleResolver,
    },
  }),
});

export default {
  HTMLPage,
};
