const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes');
const http = require('http');

const {setupWebsocket} = require('./websocket');

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://sa:P2rqmbPAQdTQjmBv@cluster0-65frc.mongodb.net/osweek10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
