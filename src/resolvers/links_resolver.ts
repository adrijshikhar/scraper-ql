import { load } from 'cheerio';
import { GraphQLFieldResolver } from 'graphql/type';
import fetch from '../api'
import { Args, RootSource } from 'scraper-ql-types';

const linksResolver: GraphQLFieldResolver<RootSource, Args> = async (root, args) => {
  console.log(root, args);
  let headers = {};
  headers = root.authorization ? { ...headers, Authorization: root.authorization } : {};
  headers = root.method ? { ...headers, Authorization: root.authorization } : {};
  const res = await fetch(root.url, { headers });
  const $ = load(res);
  const links = $('a')
    .map(function () {
      const href = $(this).attr('href')
      if (!href) {
        return;
      }
      if (
        href !== '#' &&
        href.indexOf('http') > -1
      ) {
        return href.substring(href.indexOf('http'));
      }
    })
    .get();

  return links.map((url) => ({ url }));
};

export default linksResolver;
