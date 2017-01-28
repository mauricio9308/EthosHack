(function () {
    /**
     * Created by Mauricio Lara on 1/28/17.
     */
    var app = angular.module('ethos', ['ui.router', 'ngMaterial', 'ngStorage']);

    app.config(function ($stateProvider, $urlRouterProvider) {

        /* fallback case for the routing */
        $urlRouterProvider.otherwise('/landing');

        /* states for the logged in user */
        $stateProvider.state('home', {
            url: '/',
            controller: 'HomeController',
            templateUrl: 'views/main/home.html'
        });

        /* states for the landing without session */
        $stateProvider.state('/landing', {
            url: '/landing',
            controller: 'LandingPageController',
            templateUrl: 'views/landing/landing.html',
            isPublic: true
        });

        /* states for the login process */
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/main/home.html'
        });

    });

    /* configuration method for the app */
    app.config(['$httpProvider', function ($httpProvider) {

        //$httpProvider.interceptors.push('AuthInterceptor');
    }]);

    /* just for debugging */
    app.run(run);

    // Injecting the references to the state
    run.$inject = ["$rootScope", "$log", "$state", 'CurrentSessionService'];

    /**
     * Code for the application filtering session
     * */
    function run($rootScope, $log, $state, CurrentSessionService) {
        // Listening to the state change
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParms) {

            if( !toState.isPublic && !CurrentSessionService.isUserLoggedIn()){
                // We prevent the pass and return to the login page

            }

        });
    }

}());