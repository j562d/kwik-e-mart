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
      templateUrl: 'templates/users/user.html',
      controller: 'OrdersController as orderCtrl'
    })

    // .state('editProduct', {
    //   url: '/products/:productId/edit',
    //   templateUrl: 'templates/products/edit.html',
    //   controller: 'ProductsController as pCtrl'
    // });

    .state('checkout', {
      url: '/checkout',
      templateUrl: 'templates/products/checkout.html',
      controller: 'OrdersController as orderCtrl',
      loginRequired: true
    });

  $urlRouterProvider.otherwise('/home');
}




})();

