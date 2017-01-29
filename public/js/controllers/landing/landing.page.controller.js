/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){

    angular.module('ethos').controller('LandingPageController', LandingPageController);

    // Injecting the landing page
    LandingPageController.$inject = ['$scope', '$state', '$mdDialog'];

    /**
     * Controller for the home view of the application
     * */
    function LandingPageController( $scope, $state, $mdDialog ){

        // Setting the reference for the search values
        $scope.query = '';

        /**
         * Triggering the search function
         * */
        $scope.search = function( ev ){
            // We open the search if the data is valid
            if( !$scope.query || $scope.query.length == 0 ){
                showEmptyQueryDialog( ev );
                return;
            }

            /* we go to the next search results */
            $state.go('search', {
                query: $scope.query
            });
        };


        /**
         * Showing an error dialog for the empty query case
         * */
        function showEmptyQueryDialog (ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#dialog-host')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('Debes especificar un parámetro de búsqueda :C')
                    .ok('OK')
                    .targetEvent(ev)
            );
        }
    }

}());