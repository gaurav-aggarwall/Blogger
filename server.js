const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());



// Connecting to MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true 
  }).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Application Routes
app.use('/api/blog', require('./routes/blogs'));
app.use('/api/user', require('./routes/users'));

// Routes
app.get('/', (req, res) => {
    res.send('hello');
});



// Error Handling
app.use( (error, req, res, next) => {
  console.log(error);

  const {statusCode = 500, message } = error;
  res.status(statusCode).json({message});
});



// Starting the Server
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));