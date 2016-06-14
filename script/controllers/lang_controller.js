app.controller('lang_controller', function($scope, state) {
	$scope.state = state;
	$scope.languages = LANGUAGES;
	
	//I wanted to use '$scope.state.language = $scope.selectedLang;', but angular stringifies the 
	//selectedLang variable making the functions in it disappear
	$scope.selectedLangChanged = function(name) {
		$scope.state.language = LANGUAGES[name];
	}
});
