const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (req, res) => {

});