'use strict';

angular.module('experiment.home', [
	'ui.router',
	'component.header'

]).config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "experiment/home/index.tpl.html"
    });

}).controller('CtrlHome', function($scope) {
  $scope.title = 'This is home page';

}).run(function(Header) {
	Header.addMenu('Home Menu', 'home', 10);
});
