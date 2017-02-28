(function () {
'use strict';

angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService', '$stateParams', '$state'];

function ProductsController(productService, $stateParams, $state) {
  var vm = this;

  vm.products = productService.query();

  vm.product = productService.get({id: $stateParams.productId}, function(data) {
    // vm.product = data;
    console.log(vm.product);
  })


  vm.delProduct = function(product) {
    vm.product.$delete(function() {
      console.log(vm.product);
      // vm.products.splice(vm.products.findIndex(t => t._id === product._id), 1);
      vm.products = productService.query();
      $state.go('home');
      // above is more performant than vm.products = Todo.query();
    });
  };

}


})();
