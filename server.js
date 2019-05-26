const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// To parse JSON bodies into JS objects
app.use(bodyParser.json());


// Connecting to MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Use Routes
app.use('/api/blog', require('./routes/blog'));

// Routes
app.get('/', (req, res) => {
    res.send('hello');
});



// Starting the Server
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));