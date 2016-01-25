angular.module('myFactory',[])
.factory('myFact',['$http',function($http){


	return{
		get:function(url){

		return $http.get(url);
						

		}
	}
	
}]);