"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hostnameResolver = (root) => {
    const match = root.url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && match[3];
};
exports.default = hostnameResolver;
//# sourceMappingURL=hostname_resolver.js.map