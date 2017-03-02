(function () {
'use strict';

angular.module('app')
.controller('ProductsController', ProductsController);

ProductsController.$inject = ['productService', '$stateParams', '$state', '$http', 'CartService', 'UserService'];

function ProductsController(productService, $stateParams, $state, $http, CartService, UserService) {
  var vm = this;

  vm.cart = CartService.getCart();

  vm.products = productService.query();

  if ($stateParams.productId) {
    productService.get({id: $stateParams.productId}, function(data) {
      vm.product = data;
    });
  }

  vm.delProduct = function(product) {
    vm.product.$delete(function() {
      console.log(vm.product);
      // vm.products.splice(vm.products.findIndex(t => t._id === product._id), 1);
      // vm.products = productService.query();
      $state.go('home');
      // above is more performant than vm.products = Todo.query();
    });
  };

  vm.edit = function(product) {
    vm.product.$update(function(){
      console.log(vm.product);
      $state.go('home');
    });
  };

  vm.addItemToCart = function(item) {
    CartService.addItem(item);
    $state.reload();
    Materialize.toast('added to cart!', 3000)

  }

  vm.addItemToCartView = function(product) {
  var itemToAdd = angular.copy(vm.product);
  itemToAdd.count = 1;
  vm.cart.push(itemToAdd);
  console.log(vm.cart);
}

  vm.deleteItem = function(item) {
    CartService.removeItem(item);
    $state.reload();
  }

  vm.decreaseItem = function(item) {
    CartService.decreaseItem(item);
    $state.reload();
  }


  vm.getTotal = function(){
      var total = 0;
      for(var i = 0; i < vm.cart.length; i++){
          var product = vm.cart[i];
          total += (product.price * product.qty);
      }
      return total;
  }

  vm.createReview = function() {
      productService.addreview({productId: $stateParams.productId, text: vm.text, rating: vm.rating}, function(product) {
          vm.product = product;
          vm.text = '';
          vm.rating = '';
          console.log(product);
      });
  }

  vm.deleteReview = function (review) {
      productService.deletereview({reviewId: review._id}, function(product) {
          vm.product = product;
      });
  };


}

})();
