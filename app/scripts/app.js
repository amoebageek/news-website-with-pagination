'use strict';

/**
 * @ngdoc overview
 * @name yoAngApp
 * @description
 * # yoAngApp
 *
 * Main module of the application.
 */
angular
  .module('yoAngApp', ['ui.router','myCtrl','myFactory','ui.bootstrap'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

  		$urlRouterProvider.otherwise('home');

  		$stateProvider
  			.state('home',{
  				url:'/home',
  				templateUrl:'views/main.html',
  				controller:'myCtrl'
  			});
  			

  }]);


