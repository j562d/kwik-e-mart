var Product = require('../models/product');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct
};

function getAllProducts(req, res, next) {
  Product.find().exec().then(products => {
    res.json(products);
  }).catch(err => res.status(500).json(err));
}

function createProduct(req, res, next) {
  Product.create(req.body).then(newProduct => {
    res.status(201).json(newProduct);
  }).catch(err => res.status(400).json(err));
}

function deleteProduct(req, res, next) {
  Product.findByIdAndRemove(req.params.id).then(deletedProduct => {
    res.json(deletedProduct);
  }).catch(err => res.status(400).json(err));
}

