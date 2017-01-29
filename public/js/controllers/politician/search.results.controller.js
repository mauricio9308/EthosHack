/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SearchResultsController', SearchResultsController);

    // Inject
    SearchResultsController.$inject = ['$scope', '$stateParams', '$firebaseArray', '$state', 'SearchService'];

    /**
     * Controller for the home view of the application
     * */
    function SearchResultsController($scope, $stateParams, $firebaseArray, $state, SearchService) {

        /// Flag for the empty results
        $scope.noData = false;

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {

            // Loading the state params for the query search
            $scope.searchQuery = $stateParams.query;

            // We build the firebase search query
            //var searchQueryFirebase = firebase.database().ref('perfil')
            //    .orderByChild('nombre').equalTo( $scope.searchQuery );
            //$scope.results = $firebaseArray( searchQueryFirebase );
            //console.log( $scope.results );
            SearchService.search( $scope.searchQuery).then(function( results ){
                console.log('Results');
                console.log( results );
                $scope.results = results;
            }).catch(function(){
                // We set a flag for the no results...
                $scope.noData = true;
            });
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