'use strict';
/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', [
  'ngRoute',
  'todomvc-todoCtrl',
  'todomvc-todoEscape',
  'todomvc-todoFocus',
  'todomvc-todoStorage'

]).config(function($routeProvider) {
  var routeConfig = {
    controller: 'TodoCtrl',
    templateUrl: 'todomvc-index.html',
    resolve: {
      store: ['todoStorage', function(todoStorage) {
        // Get the correct module (API or localStorage).
        return todoStorage.then(function(module) {
          module.get(); // Fetch the todo records in the background.
          return module;
        });
      }]
    }
  };

  $routeProvider
    .when('/', routeConfig)
    .when('/:status', routeConfig)
    .otherwise({
      redirectTo: '/'
    });
});
