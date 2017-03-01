var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
  text: String,
  rating: {
    type: Number,
    default: 3,
    min: 1,
    max: 5
  },
  reviewer: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date,
              default: Date.now}
});


var productSchema = new Schema({
  name: String,
  sku: Number,
  description: String,
  category: String,
  price: Number,
  imageURL: String,
  reviews: [reviewSchema]
});



module.exports = mongoose.model('Product', productSchema);
