const mongoose = require('mongoose');
const express = require('express');
const promoRouter = express.Router();

const promotionsSchema = new mongoose.Schema({
  name: String,
  image: String,
  label: String,
  price: Number,
  description: String,
  featured: Boolean,
});

const Promotion = mongoose.model('Promotion', promotionsSchema);

// GET localhost:3000/promotions
promoRouter.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();

    if (promotions.length === 0) {
      return res.status(404).send('There are no promotions in the database');
    }

    res.status(200).send(promotions);
  } catch (err) {
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/promotions
promoRouter.post('/', async (req, res) => {
  try {
    if (req.body.name && req.body.image && req.body.label && req.body.price && req.body.description) {
      const promo = new Promotion({
        name: req.body.name,
        image: req.body.image,
        label: req.body.label,
        price: req.body.price,
        description: req.body.description,
        featured: req.body.featured,
      });

      await promo.save();
      // const promo = await Promotion.create(req.body);

      res.status(200).send('Successfully saved the data');
    } else {
      res.status(400).send('All field are requires');
    }
  } catch (err) {
    res.status(404).send('Some error occured and could not save the data');
  }
});

// PUT localhost:3000/promotions
promoRouter.put('/', (req, res) => {
  res.status(403).send('PUT operation not supported on /promotions');
});

// PATCH localhost:3000/promotions
promoRouter.patch('/', (req, res) => {
  res.status(403).send('PATCH operation not supported on /promotions');
});

// DELETE localhost:3000/promotions
promoRouter.delete('/', async (req, res) => {
  try {
    await Promotion.deleteMany();

    res.status(200).send('Deleted all the elements from the database');
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

// GET localhost:3000/promotions/:promoId
promoRouter.get('/:promoId', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.promoId);

    if (!promotion) {
      return res.status(404).send('There are no items with id ' + req.params.promoId);
    }

    res.status(200).json(promotion);
  } catch (err) {
    res.status(404).send('Could not access the database');
  }
});

// POST localhost:3000/promotions/:promoId
promoRouter.post('/:promoId', (req, res) => {
  res.status(403).send('POST operation not supported on /promotions/:' + req.params.promoId);
});

// PUT localhost:3000/promotions/:promoId
promoRouter.put('/:promoId', async (req, res) => {
  try {
    await Promotion.findByIdAndUpdate(req.params.promoId, req.body);
    res.status(200).send('Will Update the promotion with id ' + req.params.promoId);
  } catch (err) {
    res.status(404).send('Some error occured and could not update the data');
  }
});

// PATCH localhost:3000/promotions/:promoId
promoRouter.patch('/:promoId', async (req, res) => {
  try {
    await Promotion.findByIdAndUpdate(req.params.promoId, req.body);
    res.status(200).send('Will Update the promotion with id ' + req.params.promoId);
  } catch (err) {
    res.status(404).send('Some error occured and could not update the data');
  }
});

// DELETE localhost:3000/promotions/:promoId
promoRouter.delete('/:promoId', async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.promoId);

    if (!promotion) {
      return res.status(404).send('There are no items with id ' + req.params.promoId);
    }

    res.status(200).send('Deleting the promotion of the employee with id ' + req.params.promoId);
  } catch (err) {
    res.status(404).send('Some error occured and could not delete the data');
  }
});

module.exports = promoRouter;
