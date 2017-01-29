(function () {
    /**
     * Created by Mauricio Lara on 1/28/17.
     */
    var app = angular.module('ethos', ['ui.router', 'ngMaterial', 'ngStorage', 'firebase', 'angular-timeline', 'angular-carousel']);

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

        /* page for the curate process */
        $stateProvider.state('curate', {
            url: '/curate',
            controller: 'CurateController',
            templateUrl: 'views/curate/curate.html',
            isPublic: false
        }).state('create_act',{
            url: '/act/create',
            controller: 'CurateCreateController',
            templateUrl: 'views/curate/curate.new.html',
            isPublic: false
        }).state('act-edit', {
            url: '/act/edit/:actaId',
            controller: 'CurateEditController',
            templateUrl: 'views/curate/curate.edit.html',
            isPublic: false
        });

        /* profile for the politician */
        $stateProvider.state('politician-page', {
            url: '/politician/:politicianId',
            controller: 'PoliticianProfileController',
            templateUrl: 'views/politician/politician.profile.html',
            isPublic: true
        }).state('search', {
            url: '/search?query',
            controller: 'SearchResultsController',
            templateUrl: 'views/politician/search_results.html',
            isPublic: true
        });

        /* states for the login process */
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/user/login.html',
            isPublic: true
        }).state('signup', {
            url: '/signup',
            controller: 'LoginController',
            templateUrl: 'views/user/signup.html',
            isPublic: true
        });

        /* states for the sources */
        $stateProvider.state('source-page', {
            url: '/source/:sourceId',
            controller: 'SourceDetailController',
            templateUrl: 'views/source/source.detail.html',
            isPublic: true
        }).state('sources', {
            url: '/source',
            controller: 'SourceListController',
            templateUrl: 'views/source/source.list.html',
            isPublic: true
        })
    });

    /* configuration method for the app */
    app.config(['$httpProvider', '$qProvider', function ($httpProvider, $qProvider) {

        //$httpProvider.interceptors.push('AuthInterceptor');

        $qProvider.errorOnUnhandledRejections(false)
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
                // We cancel the event propagation
                event.preventDefault();

                // We prevent the pass and return to the login page
                $state.go('login');
            }

        });
    }

}());