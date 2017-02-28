(function () {
'use strict';

angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService', '$stateParams', '$state', '$http', 'CartService'];

function ProductsController(productService, $stateParams, $state, $http, CartService) {
  var vm = this;

  vm.cart = CartService.getCart();


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

  // vm.getOne = function(product) {
  //   productService.get({id: $stateParams.productId}, function(data) {
  //   vm.product = data;
  //   console.log(vm.product);
  //   })
  // };

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

  // vm.addItemToCart = function(product) {
  //     if (vm.cart.length === 0){
  //       vm.product.count = 1;
  //       vm.cart.push(product);
  //       console.log(vm.cart);
  //     } else {
  //       var repeat = false;
  //       for(var i = 0; i< vm.cart.length; i++){
  //         if(vm.cart[i].id === product._id){
  //           repeat = true;
  //           vm.cart[i].count +=1;
  //         }
  //       }
  //       if (!repeat) {
  //         product.count = 1;
  //         vm.cart.push(product);
  //       }
  //     }
  // }

//   vm.addItemToCart = function(product) {
//   var itemToAdd = angular.copy(product);
//   itemToAdd.count = 1;
//   vm.cart.push(itemToAdd);
//   console.log(vm.cart);
// }

  vm.addItemToCart = function(item) {
    CartService.addItem(item);
  }

  vm.addItemToCartView = function(product) {
  var itemToAdd = angular.copy(vm.product);
  itemToAdd.count = 1;
  vm.cart.push(itemToAdd);
  console.log(vm.cart);
}

  // vm.deleteItem = function(product) {
  // var cart = vm.cart;
  // cart.splice(product, 1);
  // console.log(vm.cart);
  // }

  vm.deleteItem = function(item) {
    CartService.removeItem(item);
  }

  vm.changeQty = function(item) {
    CartService.changeItemQty(item);
  }


}

})();
