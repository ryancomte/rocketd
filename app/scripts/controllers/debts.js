'use strict';

var mod = angular.module('DebtsModule',['ngResource']);

mod.controller('DebtsCtrl', function ($scope, debtsAPI) {
    $scope.showForm = false;

    debtsAPI.get(function(data){
        $scope.debts = data;
    });



    $scope.submitDebt = function(){
        if($scope.currDebt.debtId){
            debtsAPI.findById({id: $scope.currDebt.debtId}, function (err, debt){
                    if(err){
                        console.log("this did not work", err);
                    }else{
                        debt.name = $scope.currDebt.name;
                        debt.balance = $scope.currDebt.balance;
                        debt.payment = $scope.currDebt.payment;
                        debt.percentage = $scope.currDebt.percentage;
                        debt.save();
                        $scope.currDebt = null;
                    }
            });
            $scope.showForm = false;
        }else{
            var newDebt = angular.copy($scope.currDebt),
                monthsToPayOff = function(m,p,r){
                    r = r/100;
                    return (Math.log(m) - Math.log(m-p*r/12))/Math.log(1 + r/12);
                },
                months = monthsToPayOff(newDebt.payment,newDebt.balance,newDebt.percentage),
                milliseconds = (months)*30*24*60*60*1000 + moment(),
                paidIn = moment(milliseconds).fromNow(),
                payOffDate = moment(new Date(milliseconds)).format('MMM YYYY');

            newDebt.months = months.toFixed(2);

            if(paidIn == "a few seconds ago"){
                alert('Invalid numbers. Please Revise');
                return;
            }else{
                newDebt.paidIn = paidIn;
            }

            if(payOffDate == 'Invalid date'){
                alert('Invalid numbers. Please Revise');
                return;
            }else{
                newDebt.payOffDate = payOffDate;
            }


            debtsAPI.post(newDebt, function(debt){
                    $scope.debts.push(debt);
                    $scope.currDebt = null;
            });
        }
    };

    $scope.easterEgg = function(){
        $scope.currDebt = {
            name: 'Fed Loan',
            balance: 100000,
            payment: 800,
            percentage: 7
        }
    }

    $scope.deleteDebt = function(debtId){
            debtsAPI.delete({id: debtId}, function(){
                for(var i=0;i<$scope.debts.length;i++){
                    if($scope.debts[i]._id == debtId){
                        $scope.debts.splice(i,1);
                    }
                }
                console.log(debtId + ' was deleted');
            });
    };

    $scope.editDebt = function(debt){
        window.scrollTo(0,0);
        $scope.showForm = true;
        $scope.currDebt = {
            debtId: debt._id,
            name: debt.name,
            balance: debt.balance,
            payment: debt.payment,
            percentage: debt.percentage
        };
    }
});

app.factory('debtsAPI', ['$resource', function($resource) {
    return $resource('http://localhost:8097/debts/:id',{id: '@id'},
        {
            'get': { method:'GET', isArray:true},
            'findById': {method:'GET'},
            'post': {method:'POST'},
            'delete': {method:'DELETE'}
        });
}]);




