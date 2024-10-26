import { load } from 'cheerio';
import { GraphQLFieldResolver } from 'graphql';
import fetch from '../api'
import { Args, RootSource } from '../types';

export const getImgsForUrl = async (url: string) => {
  const res = await fetch(url);
  const $ = load(res);
  return $('img')
    .map(function () {
      return $(this).attr('src');
    })
    .get();
};

const imageResolver: GraphQLFieldResolver<RootSource, Args> = (root) => getImgsForUrl(root.url);

export default imageResolver;
