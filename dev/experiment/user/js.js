'use strict';

angular.module('experiment.user', [
  'ui.router',
  'component.header',
  'experiment.user.detail'

]).config(function($stateProvider, $urlRouterProvider) {
  //
  // Now set up the states
  $stateProvider
    .state('user', {
      url: "/user",
      templateUrl: "experiment/user/index.tpl.html"
    });

}).controller('CtrlUser', function($scope) {
  $scope.title = 'This is User page';

}).run(function(Header) {
	Header.addMenu('User Menu', 'user', 30);
});
