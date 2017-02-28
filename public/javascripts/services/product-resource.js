(function () {
'use strict';


angular.module('app')
  .factory('productService', productService);

productService.$inject = ['$resource'];


function productService($resource) {
  return $resource('/api/products/:id', {id: '@_id'});
}

// function productService($resource) {
//   return $resource('/api/products/:id', {id: '@_id'}, {
//     query: {method: 'GET', isArray: true, transformResponse: function(data) {
//       return angular.fromJson(data);
//       }
//     }
//   });
// }



})();
