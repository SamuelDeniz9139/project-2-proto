const mongoose = require('mongoose');
const _ = require('underscore');

let AnimeModel = {};
const setName = (name) => _.escape(name).trim();
const AnimeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  genre: {
    type: String,
    trim: true,
    required: true,
  },
  year: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
AnimeSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  genre: doc.genre,
  year: doc.year,
});
AnimeSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };
  return AnimeModel.find(search).select('name genre year').lean().exec(callback);
};
AnimeModel = mongoose.model('Anime', AnimeSchema);
module.exports = AnimeModel;
