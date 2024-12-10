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

//Hoặc enviroment PORT
const PORT = 3000;
app.listen(PORT || 3000, () => {
    console.log(`Server is running on PORT:`, PORT || '3000');
});
