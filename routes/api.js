var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var productCtrl = require('../controllers/products');
var orderCtrl = require('../controllers/orders');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/products', productCtrl.getAllProducts);
router.get('/products/:id', productCtrl.getProduct);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);


// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)


router.post('/products', productCtrl.createProduct);
router.delete('/products/:id', productCtrl.deleteProduct);
router.put('/products/:id', productCtrl.updateProduct);
router.post('/products/:id/reviews', productCtrl.addReview);
router.delete('/reviews/:id', productCtrl.deleteReview);

router.get('/orders', orderCtrl.getAllOrders);
router.get('/orders/:id', orderCtrl.getOrder);
router.post('/orders', orderCtrl.createOrder);
router.delete('/orders/:id', orderCtrl.deleteOrder);
router.put('/orders/:id', orderCtrl.updateOrder);


module.exports = router;
