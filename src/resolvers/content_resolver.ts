import { load } from 'cheerio';
import fetch from '../api'
import { Args, RootSource } from 'scraper-ql-types';
import { GraphQLFieldResolver } from 'graphql';


const contentResolver: GraphQLFieldResolver<RootSource, Args> = async (root, args) => {
  try {
    const url = root instanceof Array ? root[0].url : root.url;
    const res = await fetch(url);
    const $ = load(res);
    let selector = '';
    if (root instanceof Array) {
      selector = root.reduce((prev, curr) => {
        let arg = '';
        if (curr.args) {
          if (curr.args.id) {
            arg = `#${curr.args.id}`;
          } else if (curr.args.class) {
            arg = `.${curr.args.class}`;
          }
        }

        const ret = `${prev} ${curr.tag}${arg}`;
        return ret;
      }, '');
    }

    let ret = [];
    const childSelector = args ? args.filter : '';
    $(selector).each(function (i, pElem) {
      let content;
      if (childSelector) {
        let childContentArr = [];
        $(pElem)
          .find(childSelector)
          .each((i, elem) => {
            const childContent = $(elem).text().trim().replace(/\s+/g, ' ');
            if (
              childContent !== '' &&
              childContentArr.indexOf(childContent) === -1
            )
              childContentArr = [...childContentArr, childContent];
          });
        content = childContentArr.join(', ');
      } else {
        content = $(pElem).text().trim().replace(/\s+/g, ' ');
      }
      if (content !== '') ret = [...ret, content];
    });
    return ret;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default contentResolver;
