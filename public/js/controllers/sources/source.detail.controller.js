/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SourceDetailController', SourceDetailController);

    // Inject
    SourceDetailController.$inject = ['sourceId', '$scope', '$mdDialog', '$firebaseObject'];

    /**
     * Controller for the detail view of the application
     * */
    function SourceDetailController(sourceId, $scope, $mdDialog, $firebaseObject) {

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
            $scope.source = $firebaseObject( firebaseDB.ref('fuente').child( sourceId ) );
        }

        // We call the loading in the main page
        loadData();

    }

}());