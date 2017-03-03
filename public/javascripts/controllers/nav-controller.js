(function () {
'use strict';

angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService', 'CartService', 'TokenService'];

function NavController($state, UserService, CartService, TokenService) {
  var vm = this;

  vm.cart = CartService.getCart();

  vm.logout = function() {
    UserService.logout();
    $state.go('home');
  };

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

}

})();
