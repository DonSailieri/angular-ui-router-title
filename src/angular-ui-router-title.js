"use strict";
angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$state", "$stateParams", function($rootScope, $timeout, $state, $stateParams) {

		$rootScope.$on("$stateChangeSuccess", function() {
			var title = getTitleValue($state.$current.self.$title);
			$timeout(function() {
				$rootScope.$title = title;
			});

			var description = getDescriptionValue($state.$current.self.$description);
			$timeout(function() {
				$rootScope.$description = description;
			});

			$rootScope.$breadcrumbs = [];
			var state = $state.$current;
			while(state) {
				if(state.resolve && state.resolve.$title) {
					$rootScope.$breadcrumbs.unshift({
						title: getTitleValue(state.self.$title),
						description: getDescriptionValue($state.$current.self.$description),
						state: state.self.name,
						stateParams: $stateParams
					})
				}
				state = state.parent;
			}
		});

		function getTitleValue(title) {
			return angular.isFunction(title) ? title() : title;
		}

		function getDescriptionValue(description) {
			return angular.isFunction(description) ? description() : description;
		}

	}]);
