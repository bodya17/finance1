var b = JXG.JSXGraph.initBoard('box', {axis: true, boundingbox: [-1, 3000, 50, -1]});

xaxis = b.create('axis', [[0, 0], [1,0]], { name:'час',
			withLabel: true,
			label: { position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
					 offset: [-15, 20]   // (in pixels)
					 }
			});
yaxis = b.create('axis', [[0, 0], [0, 1]], { name:'FV',
			withLabel: true,
			label: {
			  position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
			  offset: [-20, 0]   // (in pixels)
				}
			});
b.create('functiongraph', [ x => 1000 * Math.pow(1.03, x), 0], {strokeColor:'#0effe0', strokeWidth: 3});
// b.create('functiongraph', [ x => 1000 * Math.pow(1.1, x), 0], {strokeColor:'#0effe0', strokeWidth: 3});
// b.create('functiongraph', [ x => 1 / (0.47 - 0.1599 * Math.log(x)), 0], {strokeColor:'#ff00a0', strokeWidth: 3});

var app = angular.module('calc', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.constant("moment", moment);

app.controller('calculatorCtrl', function ($scope, $filter) {

  $scope.options = {
    // customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  $scope.pv = 1000;
  $scope.years = 1;
  $scope.interest = 0.1;
  $scope.type = 'Складні';

  $scope.difference = function () {
    var a = moment($scope.start);
    var b = moment($scope.end);
    return b.diff(a, 'days');
  }


  $scope.future = function () {
    if ($scope.type == "Прості") {
      return $scope.pv * (1 + $scope.interest * $scope.years);
    }
    return $scope.pv * Math.pow(1 + $scope.interest, $scope.years);
  };

  $scope.assetsStart   = 25000000;
  $scope.assestsEnd    = 28000000;
  $scope.investIncome  = 2125000;
  $scope.saleIncome    = 1500000;
  $scope.restOutgoings = 750000;

  $scope.d1 = 0.08;
  $scope.d2 = 0.12;

  // $scope.money;

  // $scope.$watch('assetsStart', function(value) {
  //     $scope.money = $filter('currency')($scope.assetsStart);
  // });

  $scope.salary = function () {
    let sal = $scope.saleIncome + $scope.investIncome - $scope.restOutgoings -
      $scope.assestsEnd * Math.pow(1 - $scope.d2 / 2, 2) + $scope.assetsStart / Math.pow(1 - $scope.d1 / 2, 2);
    return sal.toFixed(2);
  }

// 5 260 936,11 ₴

  // $scope.salary = $scope.saleIncome + $scope.investIncome - $scope.restOutgoings -
  //           $scope.assestsEnd * Math.pow(1 - $scope.d2 / 2, 2) + $scope.assetsStart / Math.pow(1 - $scope.d1 / 2, 2);
  //
  // console.log(salary);
  // // check
  //
  // let check = ($scope.assetsStart / (Math.pow(1 - $scope.d1 / 2, 2)) + $scope.saleIncome + $scope.investIncome
  //               - $scope.salary - $scope.restOutgoings) / (Math.pow(1 - d$scope.2 / 2, 2));
  // console.log(check);

});
