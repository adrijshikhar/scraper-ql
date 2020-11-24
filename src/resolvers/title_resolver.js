import cheerio from 'cheerio';
import fetch from 'node-fetch';

const titleResolver = async (root) => {
  const res = await fetch(root.url);
  const $ = cheerio.load(await res.text());
  return $('title').text();
};

export default titleResolver;
