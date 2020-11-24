import cheerio from 'cheerio';
import fetch from 'node-fetch';

const linksResolver = async (root) => {
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
};

export default linksResolver;
