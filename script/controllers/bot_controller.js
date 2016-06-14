app.controller('bot_controller', function($scope, state) {
	$scope.state = state;

	$scope.$watch(function(){
		return $scope.state.language && $scope.state.space;
	}, function(newValue, oldValue) {
		if(newValue === oldValue) { //to prevent it from firing on startup
			return;
		}
		if(!$scope.state.bot) {
			var space = $scope.state.space;
			var bot = initiateBotInSpace(space);
			$scope.state.bot = bot;
		}
	}, true);

	$scope.showBot = function() {
		if($scope.state.bot){
			return showBot($scope.state.bot);
		} else {
			return "";
		}
	}

	$scope.sendCommand = function(commandString) {
		var space = $scope.state.space;
		var lang = $scope.state.language;
		console.log(typeof(lang));
		var command = compileCommands(commandString, lang, space.contains);

		var bot = $scope.state.bot;
		command(bot)
		.then(function(movedBot){
			$scope.state.bot = movedBot;
			$scope.$apply();
		});
	}
})
