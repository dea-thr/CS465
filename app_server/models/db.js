const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const readLine = require('readline');

// connect with a small delay (as in the guide)
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {}), 1000);
};

// connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows console handler (harmless on macOS)
if (process.platform === 'win32') {
  const r1 = readLine.createInterface({ input: process.stdin, output: process.stdout });
  r1.on('SIGINT', () => { process.emit('SIGINT'); });
}

// graceful shutdown
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// make the initial connection and load the schema
connect();
require('./travlr');
module.exports = mongoose;
