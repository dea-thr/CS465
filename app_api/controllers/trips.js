const mongoose = require('mongoose');

let Trip;
try {
  Trip = mongoose.model('trips');
} catch {
  const tripSchema = new mongoose.Schema({
    code: String,
    name: String,
    length: mongoose.Schema.Types.Mixed,
    start: Date,
    resort: String,
    perPerson: mongoose.Schema.Types.Mixed,
    image: String,
    description: String
  }, { collection: 'trips' });
  Trip = mongoose.model('trips', tripSchema);
}

const nf = (res) => res.status(404).json({ message: 'Trip not found' });
const getId = (req) => req.params.tripid || req.params.id;

async function tripsList(_req, res) {
  const rows = await Trip.find({}).lean();
  res.status(200).json(rows);
}

async function tripsCreate(req, res) {
  try {
    const doc = await Trip.create(req.body || {});
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function tripsReadOne(req, res) {
  const id = getId(req);
  if (!id) return nf(res);
  const doc = await Trip.findById(id).lean();
  if (!doc) return nf(res);
  res.status(200).json(doc);
}

async function tripsUpdateOne(req, res) {
  const id = getId(req);
  if (!id) return nf(res);
  try {
    const doc = await Trip.findByIdAndUpdate(id, req.body || {}, { new: true, runValidators: true }).lean();
    if (!doc) return nf(res);
    res.status(200).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function tripsDeleteOne(req, res) {
  const id = getId(req);
  if (!id) return nf(res);
  const out = await Trip.findByIdAndDelete(id);
  if (!out) return nf(res);
  res.status(204).end();
}

module.exports = { tripsList, tripsCreate, tripsReadOne, tripsUpdateOne, tripsDeleteOne };
