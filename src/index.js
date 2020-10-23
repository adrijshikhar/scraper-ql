const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());

app.disable('x-powered-by'); // For security
app.use(express.urlencoded({ extended: false })); // for proper parsing of query strings
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info(`App is listening on port ${config.port}`);
});
