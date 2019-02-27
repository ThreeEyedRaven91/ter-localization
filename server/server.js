import express from 'express';
import bodyParser from 'body-parser'
import Helper from '../common/helpers/index';
import wordRoute from './routes/word';
import language from './routes/language';
import cors from 'cors';

const server = express();
const port = Helper.config.port;

server.use(bodyParser.json());
server.use(cors())
server.use('/api/word',  wordRoute);
server.use('/api/language', language);
server.use('/', express.static(__dirname + '/../dist/client'));

const preLanguages = Helper.io.read(Helper.config);
Helper.io.write(Helper.config, preLanguages);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));