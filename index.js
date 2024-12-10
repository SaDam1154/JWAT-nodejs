const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');

const app = express();
app.use(bodyParser.json());

// route
app.use('/api', route);
app.get('/', (req, res) => {
    res.json('It is work!');
});

const PORT = 3000;
app.listen(PORT || 3000, () => {
    console.log(`Server iss running on`, PORT || '3000');
});
