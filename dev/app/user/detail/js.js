'use strict';

angular.module('app.user.detail', [
  'base',
  'app.user',
  'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('user.detail', {
    url: '/:uid',
    templateUrl: 'app/user/detail/index.tpl.html'
  });

}).controller('CtrlAppUserDetail', function(Users, $scope, $stateParams) {
  $scope.user = {
    uid: $stateParams.uid,
    name: _.result(_.find(Users, {
      uid: $stateParams.uid
    }), 'name')
  };
});
