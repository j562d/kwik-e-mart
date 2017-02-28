angular.module('app')
  .factory('UserService', UserService);

UserService.$inject = ['$http', 'TokenService'];

function UserService($http, TokenService) {

  var service = {
    login,
    logout,
    signup,
    getUser,
    isLoggedIn
  };

  function login(credentials) {
    return $http.post('/api/users/login', credentials);
  }

  function logout() {
    TokenService.removeToken();
  }

  function signup(userData) {
    return $http.post('/api/users', userData);
  }

  function getUser() {
    return getUserFromToken();
  }

  function isLoggedIn() {
    return !!getUserFromToken();
  }

  return service;

  //helper functions
  function getUserFromToken() {
    var token = TokenService.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }
}
