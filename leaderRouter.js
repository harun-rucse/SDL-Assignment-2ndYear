const mongoose = require('mongoose');
const express = require('express');
const leaderRouter = express.Router();

const leadersSchema = new mongoose.Schema({
  name: String,
  image: String,
  designation: String,
  abbr: String,
  description: String,
  featured: Boolean,
});

const Leader = mongoose.model('Leader', leadersSchema);

// GET localhost:3000/leaders
leaderRouter.get('/', async (req, res) => {
  try {
    const leaders = await Leader.find();

    if (leaders.length === 0) {
      return res.status(404).send('There are no leaders in the database');
    }

    res.status(200).json(leaders);
  } catch (err) {
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/leaders
leaderRouter.post('/', async (req, res) => {
  try {
    const { name, image, designation, abbr, description, featured } = req.body;
    if (name && image && designation && abbr && description) {
      const leader = new Leader({
        name: name,
        image: image,
        designation: designation,
        abbr: abbr,
        description: description,
        featured: featured,
      });

      await leader.save();
      res.status(200).send('Successfully saved the data');
    } else {
      res.status(400).send('All field are requires');
    }
  } catch (err) {
    res.status(404).send('Some error occured and could not save the data');
  }
});

// PUT localhost:3000/leaders
leaderRouter.put('/', (req, res) => {
  res.status(403).send('PUT operation not supported on /leaders');
});

// PATCH localhost:3000/leaders
leaderRouter.patch('/', (req, res) => {
  res.status(403).send('PATCH operation not supported on /leaders');
});

// DELETE localhost:3000/leaders
leaderRouter.delete('/', async (req, res) => {
  try {
    await Leader.deleteMany();

    res.status(404).send('Deleted all the elements from the database');
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

// GET localhost:3000/leaders/:leaderId
leaderRouter.get('/:leaderId', async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.leaderId);

    if (!leader) {
      return res.status(404).send('There are no items with id ' + req.params.leaderId);
    }

    res.status(200).json(leader);
  } catch (err) {
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/leaders/:leaderId
leaderRouter.post('/:leaderId', (req, res) => {
  res.status(403).send('POST operation not supported on /leaders/:' + req.params.leaderId);
});

// PUT localhost:3000/leaders/:leaderId
leaderRouter.put('/:leaderId', async (req, res) => {
  try {
    await Leader.findByIdAndUpdate(req.params.leaderId, req.body);
    res.status(200).send('Will Update the leader with id ' + req.params.leaderId);
  } catch (err) {
    res.status(404).send('Some error occured and could not update the data');
  }
});

// PATCH localhost:3000/leaders/:leaderId
leaderRouter.patch('/:leaderId', async (req, res) => {
  try {
    await Leader.findByIdAndUpdate(req.params.leaderId, req.body);
    res.status(200).send('Will Update the leader with id ' + req.params.leaderId);
  } catch (err) {
    res.status(404).send('Some error occured and could not update the data');
  }
});

// DELETE localhost:3000/leaders/:leaderId
leaderRouter.delete('/:leaderId', async (req, res) => {
  try {
    const leader = await Leader.findByIdAndDelete(req.params.leaderId);

    if (!leader) {
      return res.status(404).send('There are no items with id ' + req.params.leaderId);
    }

    res.status(200).send('Deleting the leader of the employee with id ' + req.params.leaderId);
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

module.exports = leaderRouter;
