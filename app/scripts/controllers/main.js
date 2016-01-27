'use strict';

angular.module('myCtrl',[])
.controller('myCtrl',['$scope','myFact','$log',function($scope,myFact,$log){

	
	$scope.callApi=function(url){
		
		myFact.get(url).then(function(re){
				$scope.latestNews={};
				$scope.maxSize = 0;
                $scope.bigTotalItems =0;
			    $scope.bigCurrentPage = 0;
		
						if(re.data.response.status=='ok'){
						   if(re.data.response.total==0){

						   		$scope.feed='No News For '+$scope.searchkey;
						   		document.getElementById('loader').style.display='none';
						   		return;
						   }
						  $scope.maxSize = 5;
						  $scope.bigTotalItems = re.data.response.total;
						  $scope.bigCurrentPage = re.data.response.currentPage;

							var latestNews=re.data.response.results;
							
							angular.forEach(latestNews,function(k,v){
								
								if(! k.hasOwnProperty('thumbnail')){
									k.thumbnail='images/yeoman.png'
								}
							});
							$scope.latestNews=latestNews;
							document.getElementById('loader').style.display='none';
						}
					});
	}
	
	$scope.setPage = function (pageNo) {
		$scope.bigCurrentPage = pageNo;
		var baseUrl='http://content.guardianapis.com/search?api-key=test&showfields=thumbnail,headline&page='+pageNo+'&page-size=10';
		$scope.callApi(baseUrl);
	 }; 

	$scope.pageChanged = function() {
    //$log.log('Page changed to: ' + $scope.bigCurrentPage);
    var baseUrl='http://content.guardianapis.com/search?api-key=test&showfields=thumbnail,headline&page='+$scope.bigCurrentPage+'&page-size=10';
		$scope.callApi(baseUrl);
  };


//lets start from page=1
$scope.setPage(1);

		

$scope.feed={};
	$scope.search=function(){
		$scope.latestNews={};
		$scope.maxSize = 0;
        $scope.bigTotalItems =0;
	    $scope.bigCurrentPage = 0;

		console.log($scope.searchkey);
		if(typeof $scope.searchkey=='undefined'){
			$scope.feed='Search Key Missig';
	   		
	   		return;
		}
		document.getElementById('loader').style.display='block';
        var url='http://content.guardianapis.com/search?api-key=test&q='+$scope.searchkey+'&showfields=thumbnail,headline&page=1&page-size=10';
		$scope.feed='Results for '+$scope.searchkey;
		$scope.callApi(url);

	}

	$scope.searchByTag=function(tag){
		$scope.latestNews={};
		$scope.maxSize = 0;
        $scope.bigTotalItems =0;
	    $scope.bigCurrentPage = 0;
	document.getElementById('loader').style.display='block';
		var url='http://content.guardianapis.com/search?api-key=test&showfields=thumbnail,headline&show-tags='+tag+'&page=1&page-size=10';
		$scope.feed='Results for '+tag;
		$scope.callApi(url);
	}
}])
