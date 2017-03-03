(function () {
'use strict';

angular.module('app', ['ui.router', 'ngResource'])
  .config(configRoutes)
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'UserService'];

function runBlock($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if (toState.loginRequired && !UserService.isLoggedIn()) {
      evt.preventDefault();
      $state.go('login');
    }
  });
}

configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl'
    })

    .state('newProduct', {
      url: '/new',
      templateUrl: 'templates/products/new.html',
      controller: 'NewController as newCtrl',
      loginRequired: true
    })

    .state('viewProduct', {
      url: '/products/:productId',
      templateUrl: 'templates/products/product.html',
      controller: 'ProductsController as pCtrl'
    })

    .state('cart', {
      url: '/cart',
      templateUrl: 'templates/products/cart.html',
      controller: 'ProductsController as pCtrl'
    })

    .state('user', {
      url: '/user/:userId',
      templateUrl: 'templates/orders/orders.html',
      controller: 'OrdersController as orderCtrl',
      loginRequired: true
    })

    .state('checkout', {
      url: '/checkout',
      templateUrl: 'templates/orders/checkout.html',
      controller: 'OrdersController as orderCtrl',
      loginRequired: true
    })

    .state('confirmation', {
      url: '/confirmation',
      templateUrl: 'templates/orders/confirmation.html',
      controller: 'OrdersController as orderCtrl',
      loginRequired: true
    })

    // .state('editOrder', {
    //   url: '/editOrder',
    //   templateUrl: 'templates/products/editorder.html',
    //   controller: 'OrdersController as orderCtrl',
    //   loginRequired: true
    // })

    .state('viewOrder', {
      url: '/orders/:orderId',
      templateUrl: 'templates/orders/order.html',
      controller: 'OrdersController as orderCtrl',
      loginRequired: true
    });

  $urlRouterProvider.otherwise('/home');
}




})();

