var Order = require('../models/order');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllOrders,
  getOrder,
  createOrder
  // deleteProduct,
  // updateProduct,
  // addReview,
  // deleteReview
};

function getAllOrders(req, res, next) {
  Order.find({user: req.user._id}).exec().then(orders => {
    res.json(orders);
  }).catch(err => res.status(500).json(err));
}


function getOrder(req, res, next) {
  Order.findById(req.params.id).exec().then(order => {
    res.json(order);
  }).catch(err => res.status(500).json(err));
}

function createOrder(req, res, next) {
  req.body.user = req.user._id;
  Order.create(req.body).then(newOrder => {
    res.status(201).json(newOrder);
  }).catch(err => res.status(400).json(err));
}

// function deleteProduct(req, res, next) {
//   Product.findByIdAndRemove(req.params.id).then(deletedProduct => {
//     res.json(deletedProduct);
//   }).catch(err => res.status(400).json(err));
// }

// function updateProduct(req, res, next) {
//   Product.findByIdAndUpdate(req.params.id, req.body).exec().then(product => {
//     res.json(product);
//   }).catch(err => res.status(500).json(err));
// }


