/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('AddReferenceDialogController', AddReferenceDialogController);

    // Inject
    AddReferenceDialogController.$inject = ['$scope', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the home view of the application
     * */
    function AddReferenceDialogController($scope, $mdDialog, $firebaseArray) {

        // Init of the reference of the source dialog
        $scope.ref = {};
        $scope.source = undefined;

        /**
         * Closes the dialog
         * */
        $scope.create = function() {
            // Creating the reference
            var referenceData = {
                acto: '',
                fecha: $scope.ref.fecha,
                fuente: $scope.fuente,
                titulo: $scope.ref.title,
                url: $scope.ref.url,
                verificado: false
            };

            /* creating the key for the new reference information */
            var newReference = firebase.database().ref().child('referencia').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/referencia/' + newReference] = referenceData;

            // We update the reference data
            firebase.database().ref().update(updates);

            // Setting the reference data
            referenceData['$id'] = newReference;

            // We close the dialog for the reference
            $mdDialog.hide( referenceData );
        };

        /**
         * Cancels the dialog
         * */
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // We load the information of the sources
            $scope.sources = $firebaseArray( firebaseDB.ref('fuente') );
        }

        // We call the loading in the main page
        loadData();

    }

}());