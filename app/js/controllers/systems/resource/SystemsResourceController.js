angular.module('AgaveToGo').controller("SystemsResourceController", function($scope, $state, $stateParams, SystemsController, MessageService) {

		$scope.systemId = $stateParams.systemId;
		$scope.system = null;
		$scope.requesting = false;

		$scope.go = function(route){
			$state.go(route);
		};

		$scope.active = function(route){
			// default to details tab
			if ($state.current.name === "systems"){
				$state.go("systems.details")
			}
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "Details", route:"systems.details", active:false, executionOnly: false },
			{ heading: "Queues", route:"systems.queues", active:false, executionOnly: true },
            { heading: "History", route:"systems.history", active:false, executionOnly: false },
			{ heading: "Apps", route:"systems.apps", active:false, executionOnly: true }
			// { heading: "Stats", route:"systems.stats", active:false },
		];

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});

		$scope.getSystem = function(){
			$scope.requesting = true;
			if ($scope.systemId !== ''){
				SystemsController.getSystemDetails($scope.systemId)
					.then(
						function(response){
							$scope.system = response.result;
							$scope.requesting = false;
						},
						function(response){
							MessageService.handle(response, $translate.instant('error_systems_list'));
							$scope.requesting = false;
						}
					);
			} else {
				App.alert({type: 'danger',message: $translate.instant('error_systems_list')});
			}
		}
	})
	.filter('filterBySystemType', function () {
		return function (tabs, system) {
			return _.filter(tabs, function (tab) {
				return (!tab.executionOnly || (system && system.type === 'EXECUTION'));
			});
		};
	});