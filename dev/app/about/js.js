angular.module('app.about', [
	'base',
	'com-header',
  'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'app/about/index.tpl.html'
  });

}).run(function(comHeader) {
  comHeader.addMenu('About', 'about', 20);
});
