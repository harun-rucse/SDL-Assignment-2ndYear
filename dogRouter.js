const mongoose = require('mongoose');
const express = require('express');
const dogRouter = express.Router();

const dogSchema = new mongoose.Schema({
  name: String,
  id: Number,
});

const Dog = mongoose.model('Dog', dogSchema);

// GET localhost:3000/api/dogs
dogRouter.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find();

    if (dogs.length === 0) {
      return res.status(404).send('There are no dogs in the database');
    }

    res.status(200).json(dogs);
  } catch (err) {
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/api/dogs
dogRouter.post('/', async (req, res) => {
  try {
    if (req.body.name && req.body.id) {
      const dog = new Dog({
        name: req.body.name,
        id: req.body.id,
      });

      await dog.save();
      res.status(200).send('Successfully saved the data');
    } else {
      res.status(400).send('All field are requires');
    }
  } catch (err) {
    res.status(404).send('Some error occured and could not save the data');
  }
});

// PUT localhost:3000/api/dogs
dogRouter.put('/', (req, res) => {
  res.status(403).send('PUT operation not supported on /api/dogs');
});

// DELETE localhost:3000/api/dogs
dogRouter.delete('/', async (req, res) => {
  try {
    await Dog.deleteMany();

    res.status(404).send('Deleted all the elements from the database');
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

// GET localhost:3000/api/dogs/:dogId
dogRouter.get('/:id', async (req, res) => {
  try {
    const dog = await Dog.findOne({ id: req.params.id });

    if (!dog) {
      return res.status(404).send('There are no items with id ' + req.params.id);
    }

    res.status(200).send(dog);
  } catch (err) {
    console.log(err);
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/api/dogs/:dogId
dogRouter.post('/:dogId', (req, res) => {
  res.status(403).send('POST operation not supported on /api/dogs/:' + req.params.dogId);
});

// PUT localhost:3000/api/dogs/:dogId
dogRouter.put('/:id', async (req, res) => {
  try {
    await Dog.findOneAndUpdate({ id: req.params.id }, req.body);
    res.status(200).send('Will Update the dog with id ' + req.params.id);
  } catch (err) {
    res.status(404).send('Some error occured and could not update the data');
  }
});

// DELETE localhost:3000/api/dogs/:dogId
dogRouter.delete('/:id', async (req, res) => {
  try {
    const dog = await Dog.findOneAndDelete({ id: req.params.id });

    if (!dog) {
      return res.status(404).send('There are no items with id ' + req.params.id);
    }

    res.status(200).send('Deleting the dog of the employee with id ' + req.params.id);
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

module.exports = dogRouter;
