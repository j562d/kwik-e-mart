var mongoose = require('mongoose');

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
  email: String,
  password: String,
  address: [addressSchema],
  orders: [orderSchema]
});

module.exports = mongoose.model('User', userSchema);
