(function () {
'use strict';

angular.module('app')
.controller('NewController', NewController);

NewController.$inject = ['$window', '$state', 'productService'];

function NewController($window, $state, productService) {
  var vm = this;


  vm.addProduct = function() {
    productService.save({name:vm.product.name, sku:vm.product.sku, description: vm.product.description, category: vm.product.category, price: vm.product.price, imageURL: vm.product.imageURL}, function(product) {
      console.log(vm.products);
      $state.go('home');
    });
  };


}


})();
