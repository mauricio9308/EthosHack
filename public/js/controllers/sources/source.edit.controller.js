/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SourceEditController', SourceEditController);

    // Inject
    SourceEditController.$inject = ['sourceId', '$scope', '$mdDialog', '$firebaseObject'];

    /**
     * Controller for the detail view of the application
     * */
    function SourceEditController(sourceId, $scope, $mdDialog, $firebaseObject) {

        /**
         * Cancels the dialog
         * */
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        /**
         * Callback for the edit of the information
         * */
        $scope.edit = function(){
            // We send the validation of the data
            var editSource = {
                nombre: $scope.source.nombre,
                credibilidad: $scope.source.credibilidad,
                url: $scope.source.url
            };

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/fuente/' + sourceId] = editSource;

            // We update the reference data
            firebase.database().ref().update(updates);

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