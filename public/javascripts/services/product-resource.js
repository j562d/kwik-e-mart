(function () {
'use strict';

angular.module('app')
  .factory('productService', productService);

productService.$inject = ['$resource'];

function productService($resource) {
  return $resource('/api/products/:id', {id: '@_id'}, {
    update: { method: 'PUT'},
    addreview: {method: 'POST',
                url: '/api/products/:productId/reviews',
                params: {productId: '@productId'},
                text: ':text'},
    deletereview: {method: 'DELETE',
                url: '/api/reviews/:reviewId',
                params: {reviewId: '@reviewId'}
            }
    });
  }


})();
