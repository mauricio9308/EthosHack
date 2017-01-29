/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('PoliticianProfileController', PoliticianProfileController);

    // Inject
    PoliticianProfileController.$inject = ['$scope', '$stateParams', '$firebaseObject', '$firebaseArray', '$state'];

    /**
     * Controller for the home view of the application
     * */
    function PoliticianProfileController($scope, $stateParams, $firebaseObject, $firebaseArray, $state) {

        /**
         * We open a dialog for the information of the corruption act
         * */
        $scope.onCorruptionActClicked = function( id ){

        };

        /**
         * Clicked for the information related
         * */
        $scope.onRelatedClicked = function( related ){
            $state.go('politician-page', {
                politicianId: related['$id']
            });
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            // Getting the reference for the politician
            $scope.politicianId = $stateParams.politicianId;
            console.log('politician ID:' + $scope.politicianId);

            var firebaseDB = firebase.database();

            // Getting the politician reference
            $scope.politician = $firebaseObject( firebaseDB.ref('perfil')
                .child( $scope.politicianId) );

            // Getting the reference of the acts
            var actsQuery = firebaseDB.ref('acto').orderByChild('involucrados/' + $scope.politicianId ).equalTo( true );
            $scope.corruption_acts = $firebaseArray( actsQuery );

            // Getting the reference of the involved politicians
            var involvedQuery = firebaseDB.ref('perfil').orderByChild('complices/' + $scope.politicianId).equalTo( true );
            $scope.politician_related = $firebaseArray( involvedQuery );
        }

        // We call the loading in the main page
        loadData();

    }

}());