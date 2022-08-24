import { load } from 'cheerio';
import fetch from '../api'


const titleResolver = async (root) => {
  const res = await fetch(root.url);
  const $ = load(res);
  return $('title').text();
};

export default titleResolver;
