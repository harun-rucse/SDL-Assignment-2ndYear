const express = require('express');
const dbConnection = require('./db');
const dogRouter = require('./dogRouter');

const app = express();

// Acceept req.body object
app.use(express.json());

// Database connection
dbConnection();

app.use('/api/dogs', dogRouter);

// Server create
app.listen(3000, () => {
  console.log('Server running at port 3000');
});
