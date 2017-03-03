var Product = require('../models/product');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  addReview,
  deleteReview
};

function getAllProducts(req, res, next) {
  Product.find().exec().then(products => {
    res.json(products);
  }).catch(err => res.status(500).json(err));
}


function getProduct(req, res, next) {
  Product.findById(req.params.id).populate({
     path: 'reviews',
     populate: {
       path: 'reviewer',
       model: 'User'
     }
  }).exec().then(product => {
    res.json(product);
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

function updateProduct(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body).exec().then(product => {
    res.json(product);
  }).catch(err => res.status(500).json(err));
}

function addReview(req, res) {
    Product.findById(req.params.id)
    .then(product => {
        product.reviews.push({
            text: req.body.text,
            rating: req.body.rating,
            reviewer: req.user._id
        });
        return product.save();
    })
    .then(product => {
        res.status(200).json(product);
    });
}

function deleteReview(req, res) {
    Product.findOne({'reviews._id': req.params.id})
    .then(product => {
        product.reviews.remove(req.params.id);
        return product.save();
    })
    .then(product => {
        res.status(200).json(product);
    });
}
