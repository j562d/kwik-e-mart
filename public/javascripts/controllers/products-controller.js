(function () {
'use strict';

angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService', '$stateParams'];

function ProductsController(productService, $stateParams) {
  var vm = this;

  vm.products = productService.query();

  vm.product = productService.get({id: $stateParams.productId}, function(data) {
    // vm.product = data;
    console.log(vm.product);
  })



  // vm.delProduct = function(product) {
  //   productService.$delete(function() {
  //     vm.products.splice(vm.products.findIndex(t => t._id === productService._id), 1);
  //     // above is more performant than vm.products = Todo.query();
  //   });
  // };

}


})();
