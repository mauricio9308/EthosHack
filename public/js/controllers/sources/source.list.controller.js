/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('SourceListController', SourceListController);

    // Inject
    SourceListController.$inject = ['$scope', 'CurrentSessionService', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the detail view of the application
     * */
    function SourceListController($scope, CurrentSessionService,
                                 $mdDialog, $firebaseArray) {

        $scope.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();

        // Flag for the no data view
        $scope.noData = false;

        /**
         * Opening the state of the source detail
         * */
        $scope.onSourceClicked = function( ev, source ){
            // We open the dialog for the source info
            $mdDialog.show({
                controller: 'SourceDetailController',
                templateUrl: 'views/source/source.detail.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    sourceId : source['$id']
                }
            });
        };


        /**
         * Callback for the create of a source
         * */

        $scope.createSource = function( ev ){
            $mdDialog.show({
                controller: 'SourceCreateController',
                templateUrl: 'views/source/source.create.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        /**
         * Opening the state of the source edit
         * */
        $scope.editSource = function( ev, source ){
            // We open the dialog for the source info
            $mdDialog.show({
                controller: 'SourceEditController',
                templateUrl: 'views/source/source.edit.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    sourceId : source['$id']
                }
            });
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // We load the information of the sources
            $scope.sources = $firebaseArray( firebaseDB.ref('fuente'));
            $scope.sources.$loaded(function( data ){
                if( !data || data.length == 0 ){
                    $scope.noData = true;
                }

                console.log('data loaded... ');
                console.log( data );
            });


        }

        // We call the loading in the sources
        loadData();
    }

}());