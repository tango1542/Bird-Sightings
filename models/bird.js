var mongoose = require('mongoose');

var birdSchema = new mongoose.Schema({

  name: { type: String, required: true, unique: true },
  description: String,
  averageEggs: { type: Number, min: 1, max: 50 },
  endangered: { type: Boolean, default: false },
  datesSeen: [Date]

});

var Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
