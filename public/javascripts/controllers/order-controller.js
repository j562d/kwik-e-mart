(function () {
'use strict';

angular.module('app')
.controller('OrdersController', OrdersController);

OrdersController.$inject = ['productService', '$stateParams', '$state', '$http', 'CartService', 'UserService', 'OrderService'];

function OrdersController(productService, $stateParams, $state, $http, CartService, UserService, OrderService) {
  var vm = this;

  vm.cart = CartService.getCart();

  vm.products = productService.query();

  vm.orders = OrderService.query();


  if ($stateParams.productId) {
    productService.get({id: $stateParams.productId}, function(data) {
      vm.product = data;
    });
  }

  vm.addOrder = function() {
    OrderService.save({items:vm.cart, total:vm.getTotal(), street: vm.order.street, city: vm.order.city, zipcode: vm.order.zipcode}, function(order) {
      console.log(order);
      CartService.clearCart();
      $state.go('confirmation');
    });
  };

  vm.getTotal = function(){
      var total = 0;
      for(var i = 0; i < vm.cart.length; i++){
          var product = vm.cart[i];
          total += (product.price * product.qty);
      }
      return total;
  }

  vm.delOrder = function(order) {
    order.$delete(function() {
      vm.orders.splice(vm.orders.findIndex(t => t._id === order._id), 1);
    });
  };

}

})();
