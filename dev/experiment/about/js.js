'use strict';

angular.module('experiment.about', [
  'ui.router',
  'component.header'

]).config(function($stateProvider, $urlRouterProvider) {
  //
  // Now set up the states
  $stateProvider
    .state('about', {
      url: "/about",
      templateUrl: "experiment/about/index.tpl.html"
    });

}).controller('CtrlAbout', function($scope) {
  $scope.title = 'This is About page';

}).run(function(Header) {
	Header.addMenu('About Menu', 'about', 20);
});
