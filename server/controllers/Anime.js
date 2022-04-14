const models = require('../models');
const AnimeModel = require('../models/Anime');

const { Anime } = models;
const makerPage = (req, res) => res.render('app');
const getAnimes = (req, res) => AnimeModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred.' });
  }
  return res.json({ Animes: docs });
});
const makeAnime = async (req, res) => {
  if (!req.body.name && !req.body.genre && !req.body.rating) {
    req.body.name = 'Cory in the House';
    req.body.genre = 'Isekai';
    req.body.rating = '999';
  } else if (!req.body.name || !req.body.genre || !req.body.rating) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  const animeData = {
    name: req.body.name,
    genre: req.body.genre,
    rating: req.body.rating,
    owner: req.session.account._id,
  };
  try {
    const newAnime = new Anime(animeData);
    await newAnime.save();
    return res.status(201).json({ name: newAnime.name, genre: newAnime.genre, rating: newAnime.rating });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Anime already exists.' });
    }
    return res.status(400).json({ error: 'An error occurred.' });
  }
};
module.exports = {
  makerPage,
  makeAnime,
  getAnimes,
};
