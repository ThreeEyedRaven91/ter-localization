import express from 'express';
import bodyParser from 'body-parser'
const http = require('http')
import Helper from '../common/helpers/index';
import wordRoute from './routes/word';
import cors from 'cors';
const socketIO = require('socket.io')

const app = express();
const port = Helper.config.port;
const server = http.createServer(app)
const io = socketIO(server);
app.set('socketio', io);

io.on('connection', socket => {
  socket.on('change word', (word) => {
    io.sockets.emit('change word', word)
  })
})

app.use(bodyParser.json());
app.use(cors())
app.use('/api/word', wordRoute);
app.use('/', express.static(__dirname + '/../client'));

const preLanguages = Helper.io.read(Helper.config);
Helper.io.write(Helper.config, preLanguages);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));