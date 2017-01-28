/*
 * Created the angular app object and injects the state variable.
 * Three different controllers are used to handle the language, 
 * space and bot.
 */

const app = angular.module('bot',[]);

app.factory('state', () => ({
    'language': null,
    'space': null,
    'bot': null
}));
