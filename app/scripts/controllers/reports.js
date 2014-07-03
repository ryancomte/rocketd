'use strict';

angular.module('ReportsModule',[])
  .controller('ReportsCtrl', function ($scope, reportsAPI) {

        reportsAPI.get(function(data){
            $scope.debts = data;
            if($scope.debts.length > 1){

            }
            angular.forEach($scope.debts, function(data){
                data.totalPaid =  data.months * data.payment;
                data.interestPaid = Math.round(data.totalPaid - data.balance);
                data.months = Math.ceil(data.months);
            });
        });

  });

app.factory('reportsAPI', ['$resource', function($resource) {
    return $resource('http://localhost:8097/debts', null,
        {
            'get': { method:'GET', isArray:true},
            'post': {method:'POST'}
        });
}]);