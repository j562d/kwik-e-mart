(function () {
'use strict';


angular.module('app')
  .factory('productService', productService);

productService.$inject = ['$resource'];

function productService($resource) {
  return $resource('/api/products/:id', {id: '@_id'}, {'update': { method: 'PUT'}});
}

// function productService($resource) {
//   return $resource('/api/products/:id', {id: '@_id'}, {
//     query: {method: 'GET', isArray: true, transformResponse: function(data) {
//       return angular.fromJson(data);
//       }
//     }
//   });
// }

//   $http.get('/api/products/:id')
//   .then(function(resp) {
//     vm.products = resp.data.products;
//     //vm.allPokemon = resp.data.results;
//   });
// }


})();
