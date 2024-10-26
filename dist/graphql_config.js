'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const schema_1 = __importDefault(require('./schema'));
const extensions = ({ variables, context }) => ({
  runTime: Date.now() - context.startTime,
  variables
});
const graphqlConfig = {
  schema: schema_1.default,
  context: { startTime: Date.now() },
  pretty: true,
  graphiql: {
    defaultQuery: `{
    scrape(url: "http://google.com") {
      div {
        content
      }
    }
  }`,
    headerEditorEnabled: true
  },
  extensions,
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  })
};
exports.default = graphqlConfig;
//# sourceMappingURL=graphql_config.js.map
