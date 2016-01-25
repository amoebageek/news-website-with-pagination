'use strict';

angular.module('myCtrl',[])
.controller('myCtrl',['$scope','myFact','$log',function($scope,myFact,$log){

	
	
   
	$scope.newFeeds=function(){
		var baseUrl='http://content.guardianapis.com/search?api-key=test&showfields=thumbnail,headline&page=1&page-size=10';
			myFact.get(baseUrl)
					.then(function(re){

						if(re.data.response.status=='ok'){
							/*$scope.totalItems =re.data.response.total;
							$scope.currentPage =re.data.response.currentPage;
							*/
						  $scope.maxSize = null;
						  $scope.bigTotalItems = re.data.response.pages;
						  $scope.bigCurrentPage = re.data.response.currentPage;

							var latestNews=re.data.response.results;
							
							angular.forEach(latestNews,function(k,v){
								
								if(! k.hasOwnProperty('thumbnail')){
									k.thumbnail='/images/yeoman.png'
								}
							});
							$scope.latestNews=latestNews;
						}
					});
		

	}
	
	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	
	 }; 
	$scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };


	$scope.search=function(){
	     var searchkey='http://content.guardianapis.com/search?api-key=test&q='+$scope.searchkey+'&showfields=thumbnail,headline&page=1&page-size=10';
	
		myFact.get(searchkey)
			.then(function(re){

						if(re.data.response.status=='ok'){
								
							$scope.latestNews=re.data.response.results;
						}
					})

			console.log($scope.searchkey)
	}
}])
