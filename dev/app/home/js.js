angular.module('app.home', [
	'base',
	'com-header',
  'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/index.tpl.html'
  });

}).run(function(comHeader) {
  comHeader.addMenu('Home', 'home', 10);
});
