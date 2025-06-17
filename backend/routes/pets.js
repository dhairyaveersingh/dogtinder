// Create pet routes
const express = require('express');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const router = express.Router();

// Create pet
router.post('/', auth, async (req, res) => {
  const pet = new Pet({ ...req.body, owner: req.user.id });
  await pet.save();
  res.status(201).json(pet);
});

// Get all pets (with filters)
router.get('/', async (req, res) => {
  const filters = req.query;
  const pets = await Pet.find(filters).populate('owner', 'name');
  res.json(pets);
});

// Get my pets
router.get('/mine', auth, async (req, res) => {
  const pets = await Pet.find({ owner: req.user.id });
  res.json(pets);
});

// Update pet
router.put('/:id', auth, async (req, res) => {
  const pet = await Pet.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json(pet);
});

// Delete pet
router.delete('/:id', auth, async (req, res) => {
  await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ message: 'Pet deleted' });
});

module.exports = router;
