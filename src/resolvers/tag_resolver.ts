const tagResolver = (root, args, tag) => {
  args = args.class
    ? { ...args, class: args.class.replace(/\s/g, '.') }
    : args.class;
  const here = {
    tag,
    args,
    url : root instanceof Array ? root[0].url : root.url,
  };
  const ret = root instanceof Array ? [...root, here] : [here];
  return ret;
};

export default tagResolver;
