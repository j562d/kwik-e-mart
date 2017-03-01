(function () {
'use strict';

angular.module('app')
.controller('NewController', NewController);

NewController.$inject = ['$window', '$state', 'productService', 'UserService', 'CartService'];

function NewController($window, $state, productService, UserService, CartService) {
  var vm = this;


  vm.addProduct = function() {
    productService.save({name:vm.product.name, sku:vm.product.sku, description: vm.product.description, category: vm.product.category, price: vm.product.price, imageURL: vm.product.imageURL}, function(product) {
      console.log(vm.products);
      $state.go('home');
    });
  };

  // vm.createOrder = function() {
  //   user = UserService.getUser();

  //   items.push(CartService.getCart());
  //   total =
  //     $state.go('home');
  //   });

  // };

  // vm.createOrder = function() {
  //     var user = UserService.getUser();
  //     user.orders.push({
  //       items: vm.cart,
  //       total:
  //       user: user,
  //       address: vm.address,
  //       city: vm.city,
  //       zipcode: vm.zipcode
  //     }, function(order) {
  //       console.log(order);
  //       UserService.addOrder(user, order._id, function(data) {
  //         console.log(data);
  //       });
  //     });
  //     $state.go('home');
  //     CartService.clearCart();
  //     vm.cart = [];
  // }



}


})();
