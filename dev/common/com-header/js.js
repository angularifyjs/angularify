'use strict';

angular.module('com-header', [
  'base',
  'ui.router'

]).provider('comHeader', function() {
  var ComHeader = function() {
    this.initialize();
  };
  ComHeader.prototype.initialize = function() {
    this.template = '/common/com-header/index.tpl.html';
    this.menu = [];
  };
  ComHeader.prototype.addMenu = function(title, state, order) {
    this.menu.push({
      title: title,
      state: state,
      order: order
    });
  };

  ComHeader.$get = function() {
    return new ComHeader();
  };
  return ComHeader;

}).controller('CtrlComHeader', function() {


}).run(function(comHeader, $rootScope) {
  $rootScope.comHeader = comHeader;
});
