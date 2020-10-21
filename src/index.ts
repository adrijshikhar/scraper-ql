import express from 'express';
import config from './config/config';

const app = express();
app.use(express.json());

app.listen(config.port, () => {
    console.info(`Server is listening on port ${config.port}`);
});