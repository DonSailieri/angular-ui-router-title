"use strict";
angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$state", function($rootScope, $timeout, $state) {

		$rootScope.$on("$stateChangeSuccess", function() {
			var title = getTitleValue($state.$current.locals.globals.$title);
			$timeout(function() {
				$rootScope.$title = title;
			});

			var description = getDescriptionValue($state.$current.locals.globals.$description);
			$timeout(function() {
				$rootScope.$description = description;
			});

			$rootScope.$breadcrumbs = [];
			var state = $state.$current;
			while(state) {
				if(state.resolve && state.resolve.$title) {
					$rootScope.$breadcrumbs.unshift({
						title: getTitleValue(state.locals.globals.$title),
						description: getDescriptionValue($state.$current.locals.globals.$description),
						state: state.self.name,
						stateParams: state.locals.globals.$stateParams
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
