/*
 * Handles the select tag that allows the user to change the language.
 *
 * Has dependencies to the following files/functions:
 *  script/logic/interpreter.js
 *      LANGUAGES
 *
 */
app.controller('lang_controller', ($scope, state) => {
    $scope.state = state;
    $scope.languages = LANGUAGES;

    /*
     * I wanted to use '$scope.state.language = $scope.selectedLang;', but angular stringifies the 
     * selectedLang variable making the functions in it disappear
     */
    $scope.selectedLangChanged = name => $scope.state.language = LANGUAGES[name];
});
