const fs = require('fs');

exports.travel = (req, res) => {
  const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
  res.render('travel', { title: 'Travel', trips });
};
