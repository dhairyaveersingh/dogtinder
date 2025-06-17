// Pet Model (/backend/models/Pet.js):
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  species: String,
  breed: String,
  age: Number,
  photoUrl: String,
  intentions: [String], // ['mating', 'playdate', 'adoption']
  vaccinated: Boolean,
  // More fields as needed
});

module.exports = mongoose.model('Pet', PetSchema);
