import express from 'express';
import bodyParser from 'body-parser'
import Helper from '../helpers';
import cors from 'cors';
import open from 'open';
import '@babel/polyfill';

import wordRoute from './routes/word';
import configRoute from './routes/config';
import syncRoute from './routes/sync';

const server = express();
const port = Helper.config().port || 5050;

server.use(bodyParser.json());
server.use(cors())
server.use('/api/word', wordRoute);
server.use('/api/config', configRoute);
server.use('/api/sync', syncRoute);
server.use('/', express.static(__dirname + '/../client'));

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  open(`http://localhost:${port}`);
});