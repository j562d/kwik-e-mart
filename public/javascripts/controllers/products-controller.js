angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService'];

function ProductsController(productService) {
  var vm = this;

  vm.products = productService.query();

  vm.delProduct = function(product) {
    productService.$delete(function() {
      vm.products.splice(vm.products.findIndex(t => t._id === productService._id), 1);
      // above is more performant than vm.products = Todo.query();
    });
  };

}
