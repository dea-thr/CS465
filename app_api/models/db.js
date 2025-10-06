const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const connect = () => setTimeout(() => mongoose.connect(dbURI, {}), 1000);
mongoose.connection.on('connected', () => console.log(`API DB connected: ${dbURI}`));
mongoose.connection.on('error', err => console.log('API DB error:', err));
mongoose.connection.on('disconnected', () => console.log('API DB disconnected'));

process.once('SIGUSR2', () => { mongoose.connection.close(() => process.kill(process.pid, 'SIGUSR2')); });
process.on('SIGINT', () => { mongoose.connection.close(() => process.exit(0)); });
process.on('SIGTERM', () => { mongoose.connection.close(() => process.exit(0)); });

connect();
require('./travlr'); // load models
module.exports = mongoose;
