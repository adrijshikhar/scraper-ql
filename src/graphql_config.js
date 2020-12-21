import schema from './schema';

const extensions = ({ variables, context }) => ({
  runTime : Date.now() - context.startTime,
  variables,
});

const graphqlConfig = {
  schema,
  context  : { startTime: Date.now() },
  pretty   : true,
  graphiql : {
    defaultQuery : `{
    scrape(url: "http://google.com") {
      div {
        content
      }
    }
  }`,
    headerEditorEnabled : true,
  },
  extensions,
  customFormatErrorFn : (error) => ({
    message   : error.message,
    locations : error.locations,
    stack     : error.stack ? error.stack.split('\n') : [],
    path      : error.path,
  }),
};
export default graphqlConfig;
