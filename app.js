const express = require('express');
const dbConnection = require('./db');
const dishRouter = require('./dishRouter');
const promoRouter = require('./promoRouter');
const leaderRouter = require('./leaderRouter');

const app = express();

// Acceept req.body object
app.use(express.json());

// Database connection
dbConnection();

// Routes define
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// Server create
app.listen(3000, () => {
  console.log('Server running at port 3000');
});
