const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// To parse JSON bodies into JS objects
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
    res.send('hello');
});



// Starting the Server
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));