const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TTL = '2h';

exports.register = async (req,res)=>{
  try{
    const {name,email,password} = req.body || {};
    if(!name || !email || !password) return res.status(400).json({message:'name, email, password required'});
    let existing = await User.findOne({email});
    if(existing) return res.status(409).json({message:'email already exists'});
    const u = new User({name,email,hash:''});
    await u.setPassword(password);
    await u.save();
    res.status(201).json({id:u._id,name:u.name,email:u.email});
  }catch(e){ res.status(400).json({error:e.message}); }
};

exports.login = async (req,res)=>{
  try{
    const {email,password} = req.body || {};
    const u = await User.findOne({email});
    if(!u) return res.status(401).json({message:'invalid credentials'});
    const ok = await u.validatePassword(password);
    if(!ok) return res.status(401).json({message:'invalid credentials'});
    const token = jwt.sign({sub:String(u._id),email:u.email,name:u.name}, JWT_SECRET, {expiresIn:TTL});
    res.status(200).json({token});
  }catch(e){ res.status(400).json({error:e.message}); }
};

exports.requireAuth = (req,res,next)=>{
  try{
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if(!token) return res.status(401).json({message:'missing token'});
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  }catch(e){ return res.status(401).json({message:'invalid token'}); }
};
