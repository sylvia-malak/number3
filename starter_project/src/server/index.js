var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow methods
    credentials: true, 
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions)); 

app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));;
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});

