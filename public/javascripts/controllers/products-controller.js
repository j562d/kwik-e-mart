(function () {
'use strict';

angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService', '$stateParams', '$state', '$http'];

function ProductsController(productService, $stateParams, $state, $http) {
  var vm = this;

  vm.products = productService.query();
  // vm.products=[];

   // $http.get('/api/products/')
   // .then(function(resp) {
   //     vm.products = resp.data.products;
   //     console.log(resp.data);
   // });


  // productService.getProducts(function(data) {
  //   vm.products = data;
  // })

  vm.product = productService.get({id: $stateParams.productId}, function(data) {
    // vm.product = data;
    console.log(vm.product);
  })

  // vm.getOne = function() {
  //   productService.get({id: $stateParams.productId}, function(data) {
  //   vm.product = data;
  //   console.log(vm.product);


  vm.delProduct = function(product) {
    vm.product.$delete(function() {
      console.log(vm.product);
      // vm.products.splice(vm.products.findIndex(t => t._id === product._id), 1);
      vm.products = productService.query();
      $state.go('home');
      // above is more performant than vm.products = Todo.query();
    });
  };

  // vm.selectProduct = function(product) {
  //   vm.productEditing = product;
  // };

  vm.edit = function(product) {
    vm.product.$update(function(){
      console.log(vm.product);
      $state.go('home');
    });
  };
  // vm.editProduct = function(product) {
  //   vm.product.$update(function () {
  //     console.log(product);
  //     vm.products = productService.query();
  //     // $state.go('home');
  //   });
  // };


}


})();
