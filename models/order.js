var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var orderSchema = new Schema({
  createdAt: {type: Date,
              default: Date.now},
  items: [],
  total: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  street: String,
  city: String,
  zipcode: Number,
  shipped: {type: Boolean,
            default: false}
});



module.exports = mongoose.model('Order', orderSchema);
