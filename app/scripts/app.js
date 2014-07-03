'use strict';

var app = angular.module('rocketdApp', ['ui.router', 'DebtsModule','NavModule','ReportsModule','DashboardModule']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    var nav = {
        templateUrl: 'views/nav.html',
        controller: 'NavCtrl'
    };

    $stateProvider

        .state('dashboard', {
            url:'/',
            views:{
                nav: nav,
                body: {
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })

        .state('debts', {
            url:'/debts',
            views:{
                nav: nav,
                body: {
                    templateUrl: 'views/debts.html',
                    controller: 'DebtsCtrl'
                }
            }
        })

        .state('reports', {
            url:'/reports',
            views:{
                nav: nav,
                body: {
                    templateUrl: 'views/reports.html',
                    controller: 'ReportsCtrl'
                }
            }
        })
});
