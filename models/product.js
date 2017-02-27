var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var productSchema = new Schema({
  name: String,
  sku: Number,
  description: String,
  category: String,
  price: Number,
  imageURL: String
  // reviews: [reviewSchema]
});



module.exports = mongoose.model('Product', productSchema);
