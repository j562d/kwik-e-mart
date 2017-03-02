(function () {
'use strict';


angular.module('app')
  .factory('OrderService', OrderService);

OrderService.$inject = ['$resource'];

function OrderService($resource) {
  return $resource('/api/orders/:id', {id: '@_id'}, {
    update: { method: 'PUT'}
  });
  }




})();
