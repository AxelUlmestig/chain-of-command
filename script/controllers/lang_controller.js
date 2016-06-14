app.controller('lang_controller', function($scope, state) {
	$scope.state = state;
	$scope.languages = LANGUAGES;

	$scope.selectedLangChanged = function() {
		$scope.state.language = $scope.selectedLang;
	}
});
