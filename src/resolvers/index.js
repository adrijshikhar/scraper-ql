/* eslint-disable no-unused-vars */
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { validHTMLTags } from '../config/constants.js';
const validAttributes = {
  id      : { type: GraphQLString },
  class   : { type: GraphQLString },
  src     : { type: GraphQLString },
  content : { type: GraphQLString },
};

const getImgsForUrl = async (url) => {
  const res = await fetch(url);
  const $ = load(await res.text());
  return $('img')
    .map(function () {
      return $(this).attr('src');
    })
    .get();
};

const htmlFields = () =>
  validHTMLTags.reduce(
    (prev, tag) => ({
      ...prev,
      [`${tag}`] : {
        type : HtmlNode,
        args : {
          ...validAttributes,
        },
        resolve(root, args, context) {
          const here = {
            tag,
            args,
            url : root.url || root[0].url,
          };
          return [...root, here];
        },
      },
      content : {
        type    : GraphQLString,
        resolve : async (root, args, context) => {
          const res = await fetch(root[0].url);
          const $ = load(await res.text());
          const selector = root.reduce((prev, curr) => {
            let arg = '';
            if (curr.args.id) {
              arg = `#${curr.args.id}`;
            } else if (curr.args.class) {
              arg = `.${curr.args.class}`;
            }

            const ret = `${prev} ${curr.tag}${arg}`;
            return ret;
          }, '');
          return $(selector).html();
        },
      },
    }),
    {}
  );

const HtmlNode = new GraphQLObjectType({
  name   : 'HtmlNode',
  fields : htmlFields,
});

const HtmlPage = new GraphQLObjectType({
  name   : 'HtmlPage',
  fields : () => ({
    ...htmlFields(),
    images : {
      type : new GraphQLList(GraphQLString),
      resolve(root, args, context) {
        return getImgsForUrl(root.url);
      },
    },
    url : {
      type : GraphQLString,
      resolve(root, args, context) {
        return root.url;
      },
    },
    links : {
      type    : new GraphQLList(HtmlPage),
      resolve : async (root, args, context) => {
        const res = await fetch(root.url);
        const $ = load(await res.text());
        const links = $('a')
          .map(function () {
            if (!$(this).attr('href')) {
              return;
            }
            if (
              $(this).attr('href') !== '#' &&
              $(this).attr('href').indexOf('http') > -1
            ) {
              return $(this).attr('href');
            }
          })
          .get();

        return links.map((url) => ({ url }));
      },
    },
  }),
});

export default {
  HtmlPage,
};
