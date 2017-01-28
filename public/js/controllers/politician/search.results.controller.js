/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SearchResultsController', SearchResultsController);

    // Inject
    SearchResultsController.$inject = ['$scope', '$stateParams', '$firebaseArray', '$state'];

    /**
     * Controller for the home view of the application
     * */
    function SearchResultsController($scope, $stateParams, $firebaseArray, $state) {

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {

            // Loading the state params for the query search
            $scope.searchQuery = $stateParams.query;

            // We build the firebase search query
            var searchQueryFirebase = firebase.database().ref('perfil')
                .orderByChild('nombre').equalTo( $scope.searchQuery );
            $scope.results = $firebaseArray( searchQueryFirebase );
            console.log( $scope.results );
        }

        /**
         * Callback for the click of the search result
         * */
        $scope.onResultClicked = function( result ){
            $state.go('politician-page', {
                politicianId: result['$id']
            });
        };

        // We call the loading in the main page
        loadData();
    }

}());