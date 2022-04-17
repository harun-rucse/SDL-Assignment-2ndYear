const express = require('express');
const dishRouter = express.Router();

// GET localhost:3000/dishes
dishRouter.get('/', (req, res) => {
  res.status(200).send('Will send all the dishes to you!');
});

// POST localhost:3000/dishes
dishRouter.post('/', (req, res) => {
  res.status(200).send('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

// PUT localhost:3000/dishes
dishRouter.put('/', (req, res) => {
  res.status(403).send('PUT operation not supported on /dishes');
});

// PATCH localhost:3000/dishes
dishRouter.patch('/', (req, res) => {
  res.status(403).send('PATCH operation not supported on /dishes');
});

// DELETE localhost:3000/dishes
dishRouter.delete('/', (req, res) => {
  res.status(200).send('Deleting all dishes');
});

// GET localhost:3000/dishes/:dishId
dishRouter.get('/:dishId', (req, res) => {
  res.status(200).send('Will send the ' + req.params.dishId + ' number dish to you!');
});

// POST localhost:3000/dishes/:dishId
dishRouter.post('/:dishId', (req, res) => {
  res.status(403).send('POST operation not supported on /dishes/:' + req.params.dishId);
});

// PUT localhost:3000/dishes/:dishId
dishRouter.put('/:dishId', (req, res) => {
  res.status(200).send('Will Update the ' + req.params.dishId + ' number dish');
});

// PATCH localhost:3000/dishes/:dishId
dishRouter.patch('/:dishId', (req, res) => {
  res.status(200).send('Will Update the ' + req.params.dishId + ' number dish');
});

// DELETE localhost:3000/dishes/:dishId
dishRouter.delete('/:dishId', (req, res) => {
  res.status(200).send('Deleting the ' + req.params.dishId + ' number dish');
});

module.exports = dishRouter;
