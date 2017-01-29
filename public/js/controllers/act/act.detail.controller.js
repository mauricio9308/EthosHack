/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('ActDetailController', ActDetailController);

    // Inject
    ActDetailController.$inject = ['actId', '$scope', '$state',
        '$mdDialog', '$firebaseArray', '$firebaseObject'];

    /**
     * Controller for the detail view of the application
     * */
    function ActDetailController(actId, $scope, $state,
                                 $mdDialog, $firebaseArray, $firebaseObject) {

        /**
         * Opening the state of the politician
         * */
        $scope.onPoliticianClicked = function( politician ){
            $state.go('politician-page', {
                politicianId: politician['$id']
            });
        };

        /**
         * Cancels the dialog
         * */
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // We load the information of the sources
            $scope.act = $firebaseObject( firebaseDB.ref('acto').child( actId ) );

            // Load the information of the act
            // We obtain the references for the corruption acts
            $scope.act.$loaded(function( data ){
                // For each of the involved we input the data
                if( data.involucrados ){
                    // We start the reference for the involved
                    $scope.act.complices = [];

                    for (var complice in data.involucrados) {
                        $scope.act.complices.push( $firebaseObject( firebaseDB.ref('perfil').child( complice ) ));
                    }
                }

                // For each of the refs we input the data
                if( data.referencias ){
                    // We start the reference for the references
                    $scope.act.refs  = [];

                    for (var reference in data.referencias) {
                        $scope.act.refs.push( $firebaseObject( firebaseDB.ref('referencia').child( reference ) ));
                    }
                }
            });
        }

        // We call the loading in the main page
        loadData();

    }

}());