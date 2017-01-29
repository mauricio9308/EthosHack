/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('PoliticsListController', PoliticsListController);

    // Inject
    PoliticsListController.$inject = ['$scope', '$state', 'CurrentSessionService', '$mdDialog', '$firebaseArray'];

    /**
     * Controller for the detail view of the application
     * */
    function PoliticsListController($scope, $state, CurrentSessionService,
                                 $mdDialog, $firebaseArray) {

        $scope.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();

        // Flag for the no data view
        $scope.noData = false;

        /**
         * Opening the state of the source detail
         * */
        $scope.onPoliticianClicked = function( ev, politic ){
            // We open the dialog for the source info
            $state.go('politician-page', {
                politicianId: politic['$id']
            });
        };

        /**
         * Callback for the create of a politician
         * */
        $scope.createPolitician = function( ev ){
            //$mdDialog.show({
            //    controller: 'SourceCreateController',
            //    templateUrl: 'views/source/source.create.html',
            //    parent: angular.element(document.body),
            //    targetEvent: ev,
            //    clickOutsideToClose:true
            //});
        };

        /**
         * Opening the state of the source edit
         * */
        $scope.editPolitician = function( ev, source ){
            // We open the dialog for the source info
            //$mdDialog.show({
            //    controller: 'SourceEditController',
            //    templateUrl: 'views/source/source.edit.html',
            //    parent: angular.element(document.body),
            //    targetEvent: ev,
            //    clickOutsideToClose:true,
            //    locals: {
            //        sourceId : source['$id']
            //    }
            //});
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // We load the information of the sources
            $scope.politics = $firebaseArray( firebaseDB.ref('perfil'));
            $scope.politics.$loaded(function( data ){
                if( !data || data.length == 0 ){
                    $scope.noData = true;
                }
            });
        }

        // We call the loading in the sources
        loadData();
    }

}());