'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tagResolver = (root, args, tag) => {
  args = args.class
    ? Object.assign(Object.assign({}, args), { class: args.class.replace(/\s/g, '.') })
    : args.class;
  const here = {
    tag,
    args,
    url: root instanceof Array ? root[0].url : root.url
  };
  const ret = root instanceof Array ? [...root, here] : [here];
  return ret;
};
exports.default = tagResolver;
//# sourceMappingURL=tag_resolver.js.map
