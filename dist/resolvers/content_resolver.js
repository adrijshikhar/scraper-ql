'use strict';
let __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
let __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cheerio_1 = require('cheerio');
const api_1 = __importDefault(require('../api'));
const contentResolver = (root, args) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const url = root instanceof Array ? root[0].url : root.url;
      const res = yield (0, api_1.default)(url);
      const $ = (0, cheerio_1.load)(res);
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
              if (childContent !== '' && childContentArr.indexOf(childContent) === -1)
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
  });
exports.default = contentResolver;
//# sourceMappingURL=content_resolver.js.map
