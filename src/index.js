import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import schema from './schema';

import config from './config/config.js';

const { port } = config;
const app = express();

app.disable('x-powered-by'); // For security

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for proper parsing of query strings
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use('/', (req, res) => {
  graphqlHTTP({
    schema,
    pretty   : true,
    graphiql : true,
  })(req, res);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`App is listening on port ${port}`);
});
