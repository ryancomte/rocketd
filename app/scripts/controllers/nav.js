'use strict';

var app = angular.module('NavModule',[]);
app.controller('NavCtrl', function ($scope, $location) {
    $scope.nav = ['dashboard','debts','reports'];
    $scope.currentUrl = $location.path;
  });
