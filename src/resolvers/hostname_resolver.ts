/* eslint-disable no-useless-escape */

const hostnameResolver = (root) => {
  const match = root.url.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );
  return match && match[3];
};

export default hostnameResolver;
