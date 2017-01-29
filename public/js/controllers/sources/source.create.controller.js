/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SourceCreateController', SourceCreateController);

    // Inject
    SourceCreateController.$inject = ['$scope', '$mdDialog', '$firebaseObject'];

    /**
     * Controller for the detail view of the application
     * */
    function SourceCreateController($scope, $mdDialog, $firebaseObject) {

        // Reference for the new source
        $scope.source = {};

        /**
         * Cancels the dialog
         * */
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        /**
         * Callback for the create of the information
         * */
        $scope.create = function(){
            // We send the validation of the data
            var newSource = {
                nombre: $scope.source.nombre,
                credibilidad: "1",
                url: $scope.source.url
            };

            /* creating the key for the new reference information */
            var newSourceReference = firebase.database().ref().child('fuente').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/fuente/' + newSourceReference] = newSource;

            // We update the reference data
            firebase.database().ref().update(updates);

            $mdDialog.cancel();
        };

    }

}());