/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */

const hostnameResolver = (root) => {
  // eslint-disable-next-line security/detect-unsafe-regex
  const match = root.url.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );
  return match && match[3];
};

export default hostnameResolver;
