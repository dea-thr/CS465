const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type:String, required:true },
  email: { type:String, required:true, unique:true },
  hash: { type:String, required:true }
}, { collection:'users' });

userSchema.methods.setPassword = async function(password){
  this.hash = await bcrypt.hash(password, 10);
};
userSchema.methods.validatePassword = async function(password){
  return bcrypt.compare(password, this.hash);
};

module.exports = mongoose.models.users || mongoose.model('users', userSchema);
