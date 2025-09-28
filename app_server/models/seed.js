const fs = require('fs');
const path = require('path');
const mongoose = require('./db');          // initializes the connection and schema
const Trip = mongoose.model('trips');

async function run() {
  const file = path.join(__dirname, '../../data/trips.json');
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));

  await Trip.deleteMany({});
  const res = await Trip.insertMany(json);
  console.log(`Seeded ${res.length} trips`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
