(function () {
    /**
     * Created by Mauricio Lara on 1/28/17.
     */
    var app = angular.module('ethos', ['ui.router', 'ngMaterial', 'ngStorage', 'firebase']);

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
        $stateProvider.state('landing', {
            url: '/landing',
            controller: 'LandingPageController',
            templateUrl: 'views/landing/landing.html',
            isPublic: true
        }).state('contact', {
            url: '/contact',
            controller: 'ContactController',
            templateUrl: 'views/landing/contact.html',
            isPublic: true
        });

        /* profile for the politician */
        $stateProvider.state('politician-page', {
            url: '/politician/:politician',
            controller: 'PoliticianProfileController',
            templateUrl: 'views/politician/politician.profile.html',
            isPublic: true
        });

        /* states for the login process */
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/user/login.html'
        }).state('signup', {
            url: '/signup',
            controller: 'LoginController',
            templateUrl: 'views/user/signup.html'
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

            console.log('go to:' + toState);

            if( !toState.isPublic && !CurrentSessionService.isUserLoggedIn()){
                // We prevent the pass and return to the login page

            }

        });
    }

}());