'use strict';

angular.module('experiment.user.detail', [
  'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
  //
  // Now set up the states
  $stateProvider
    .state('user.detail', {
      url: "/:uid",
      templateUrl: "experiment/user/detail/index.tpl.html"
    });

}).controller('CtrlUserDetail', function($stateParams, $scope) {
	$scope.data = {
		uid: $stateParams.uid
	};
});
