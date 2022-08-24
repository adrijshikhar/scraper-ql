import { OptionsData } from 'express-graphql';
import schema from './schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extensions: any = ({ variables, context }) => ({
  runTime : Date.now() - context.startTime,
  variables,
});

const graphqlConfig: OptionsData = {
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
