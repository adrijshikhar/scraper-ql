/* eslint-disable no-unused-vars */
import cheerio from 'cheerio';
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
  const $ = cheerio.load(await res.text());
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
        resolve(root, args) {
          const here = {
            tag,
            args,
            url : root.url || root[0].url,
          };
          return [here];
        },
      },
      content : {
        type    : GraphQLString,
        resolve : async (root) => {
          let url = root instanceof Array ? root[0].url : root.url;
          const res = await fetch(url);
          const $ = cheerio.load(await res.text());
          let selector = '';
          if (root instanceof Array) {
            selector = root.reduce((prev, curr) => {
              let arg = '';
              if (curr.args.id) {
                arg = `#${curr.args.id}`;
              } else if (curr.args.class) {
                arg = `.${curr.args.class}`;
              }

              const ret = `${prev} ${curr.tag}${arg}`;
              return ret;
            }, '');
          } else {
            return $.html()
          }
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
      resolve(root) {
        return getImgsForUrl(root.url);
      },
    },
    url : {
      type : GraphQLString,
      resolve(root) {
        return root.url;
      },
    },
    links : {
      type    : new GraphQLList(HtmlPage),
      resolve : async (root) => {
        const res = await fetch(root.url);
        const $ = cheerio.load(await res.text());
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
    hostname : {
      type : GraphQLString,
      resolve(root) {
        // eslint-disable-next-line security/detect-unsafe-regex
        const match = root.url.match(
          /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
        );
        return match && match[3];
      },
    },
    title : {
      type    : GraphQLString,
      resolve : async (root) => {
        const res = await fetch(root.url);
        const $ = cheerio.load(await res.text());
        return $('title').text();
      },
    },
  }),
});

export default {
  HtmlPage,
};
