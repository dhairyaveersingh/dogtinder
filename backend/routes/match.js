const express = require('express');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const router = express.Router();

// Get suggestions for my pet(s)
router.get('/suggestions', auth, async (req, res) => {
  const myPets = await Pet.find({ owner: req.user.id });
  // Example: suggest pets not owned by me, same species, matching intentions
  const suggestions = await Pet.find({
    owner: { $ne: req.user.id },
    species: { $in: myPets.map(p => p.species) },
    intentions: { $in: myPets.flatMap(p => p.intentions) }
  }).limit(20);
  res.json(suggestions);
});

module.exports = router;
