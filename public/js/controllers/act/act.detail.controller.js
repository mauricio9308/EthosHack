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
            $mdDialog.cancel();

            $state.go('politician-page', {
                politicianId: politician['$id']
            });
        };

        /**
         * Opens the source dialog
         * */
        $scope.viewSource = function( ev, sourceId ){
            // Opens the source dialog
            $mdDialog.show({
                controller: 'SourceDetailController',
                templateUrl: 'views/source/source.detail.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    sourceId : sourceId
                }
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
                        var refObject = firebaseDB.ref('referencia').child( reference );
                        $scope.act.refs.push( $firebaseObject( refObject ) );
                    }
                }
            });
        }

        // We call the loading in the main page
        loadData();

    }

}());