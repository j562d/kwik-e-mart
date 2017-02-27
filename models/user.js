var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  street: String,
  city: String,
  zipcode: Number
});

var orderSchema = new Schema ({
  number: Number,
  createdAt: {type: Date,
              default: Date.now},
  items: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  total: Number,
  shipped: {type: Boolean,
            default: false}
});

var userSchema = new Schema({
  name: String,
  email: {type: String, lowercase: true, unique: true},
  password: String,
  address: [addressSchema],
  orders: [orderSchema]
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // override the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
