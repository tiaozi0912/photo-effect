(function() {
  var app = angular.module('redEnvelopesApp', []);

  app.controller('ctrl', ['$scope', '$http', function($scope, $http) {
  	var settings = {
  		max: 30,
  		url: '/red_envelopes'
  	};

  	$scope.shownList = false;
  	$scope.total = 0;

  	$.ajax({
  		url: settings.url,
  		dataType: 'json',
  		type: "GET",
  		success: function(res) {
  			$scope.redEnvelopes = res.red_envelopes;
  			$scope.total = res.total;
  			$scope.alreadyClaim = res.already_claim;
  			$scope.$apply();
  		}
  	});

    //Core algorithm to generate the amount of red envelope
  	function generateAmount() {
  		return Math.random() * settings.max;
  	}
    
    $scope.claim = function() {
      var url = '/red_envelopes',
          amount = generateAmount(),
          data = {
          	red_envelope: {
          		amount: amount
          	}
          };
      $http.post(url, data).success(function(res) {
      	if (res.red_envelope) {
      		$scope.total += res.red_envelope.amount;
          $scope.redEnvelopes.push(res.red_envelope);
          $scope.alreadyClaim = true;
      	}else {
      		alert(res.message);
      	}
        
      });
    };

    $scope.showList = function(e) {
    	e.preventDefault();
    	$scope.shownList = true;
    }

    $scope.back = function() {
    	$scope.shownList = false;
    }

    $scope.date = function(unixCode) {
      return moment(unixCode * 1000).zone("-0800").format('L');
    }

    //set screen height
    function setScreenHeight() {
    	var height = $(window).height();
    	$('.page').height(height);
    }

    setScreenHeight();

  }]);

})()
