import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const getImgsForUrl = async (url) => {
  const res = await fetch(url);
  const $ = cheerio.load(await res.text());
  return $('img')
    .map(function () {
      return $(this).attr('src');
    })
    .get();
};

const imageResolver = (root) => {
  return getImgsForUrl(root.url);
};

export default imageResolver;
