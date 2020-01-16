const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://sa:P2rqmbPAQdTQjmBv@cluster0-65frc.mongodb.net/osweek10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
