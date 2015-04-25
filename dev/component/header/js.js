'use strict';

angular.module('component.header', [

]).factory('Header', function() {
  var res = {
    data: [],
    addMenu: function(title, state, order) {
      res.data.push({
        title: title,
        state: state,
        order: order
      });
    }
  };
  return res;

}).controller('CtrlHeader', function(Header, $http, $scope) {
  $scope.header = Header;
  $scope.contact = [];

  $scope.input = {
    email: null,
    password: null
  };

  $scope.submit = function() {
    console.log($scope.input);
  };

  var url = 'http://jsonip.com/about';
  $http.get(url).success(function(data, status, headers, config) {
    $scope.contact = data.Contact;

  }).error(function(data, status, headers, config) {

  });
});
