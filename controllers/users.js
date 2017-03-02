var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;
var auth = require('../config/auth');

module.exports = {
  create,
  login,
  logout,
  me
};

function create(req, res, next) {
  User.create(req.body).then(user => {
    auth.createToken(user, res);
    res.json({msg: 'signed up successfully'});
  }).catch( err => res.status(400).json(err) );
}


function login(req, res, next) {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        auth.createToken(user, res);
        res.json({msg: 'logged in successfully'});
      } else {
        return res.status(401).json({err: 'Incorrect login information'});
      }
    });
  }).catch(err => res.status(401).json('Error occured: ' + err));
}

function logout(req, res, next) {
  req.session.userId = null;
  res.status(200).json({});
}


function me(req, res, next) {
  res.json(req.user);
}
