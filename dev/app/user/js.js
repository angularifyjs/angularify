angular.module('app.user', [
  'base',
  'app.user.detail',
  'com-header',
  'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('user', {
    url: '/user',
    templateUrl: 'app/user/index.tpl.html'
  });

}).factory('Users', function() {
  return angular.copy([{
    uid: '1',
    name: 'A'
  }, {
    uid: '2',
    name: 'B'
  }, {
    uid: '3',
    name: 'C'
  }]);

}).controller('CtrlAppUser', function(Users, $scope) {
  $scope.users = Users;

}).run(function(comHeader) {
  comHeader.addMenu('Users', 'user', 30);
});
