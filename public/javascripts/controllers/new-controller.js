(function () {
'use strict';

angular.module('app')
.controller('NewController', NewController);

NewController.$inject = ['$window', '$state', '$stateParams', 'productService', 'UserService', 'CartService'];

function NewController($window, $state, $stateParams, productService, UserService, CartService) {
  var vm = this;

  // if ($stateParams.productId) {
  //   productService.get({id: $stateParams.productId}, function(data) {
  //     vm.product = data;
  //   });
  // }

  vm.addProduct = function() {
    productService.save({name:vm.product.name, sku:vm.product.sku, description: vm.product.description, category: vm.product.category, price: vm.product.price, imageURL: vm.product.imageURL}, function(product) {
      console.log(vm.products);
      $state.go('home');
    });
  };

  // vm.delProduct = function(product) {
  //   vm.product.$delete(function() {
  //     console.log(vm.product);
  //     // vm.products.splice(vm.products.findIndex(t => t._id === product._id), 1);
  //     // vm.products = productService.query();
  //     $state.go('home');
  //     // above is more performant than vm.products = Todo.query();
  //   });
  // };

  // vm.edit = function(product) {
  //   vm.product.$update(function(){
  //     console.log(vm.product);
  //     $state.go('home');
  //   });
  // };

}


})();
