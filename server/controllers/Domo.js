const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;
const makerPage = (req, res) => res.render('app');
const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred.' });
  }
  return res.json({ domos: docs });
});
const makeDomo = async (req, res) => {
  if (!req.body.name && !req.body.age && !req.body.color) {
    req.body.name = 'I was unnamed';
    req.body.age = '69';
    req.body.color = 'White, I guess';
  } else if (!req.body.name || !req.body.age || !req.body.color) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    owner: req.session.account._id,
  };
  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, color: newDomo.color });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists.' });
    }
    return res.status(400).json({ error: 'An error occurred.' });
  }
};
module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
