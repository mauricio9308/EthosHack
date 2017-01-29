/**
 * Created by Mauricio Lara on 1/28/17.
 */

(function () {

    angular.module('ethos').controller('CurateCreateController', CurateCreateController);

    // Inject
    CurateCreateController.$inject = ['$scope', '$firebaseArray', '$state', '$mdDialog'];

    /**
     * Controller for the home view of the application
     * */
    function CurateCreateController($scope, $firebaseArray, $state, $mdDialog) {

        // Reference for the act to be created
        $scope.act = {};

        /**
         * We go to the create reference dialog
         * */
        $scope.createReference = function( ev ){
            $mdDialog.show({
                    controller: 'AddReferenceDialogController',
                    templateUrl: 'views/curate/add.reference.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function( newReference ) {
                    if( !$scope.act.refs ){
                        $scope.act.refs = [];
                    }
                    $scope.act.refs.push( newReference );
                }, function() {
                    console.log('nothing was selected from the dialog...');
                });
        };

        /**
         * Opens the dialog for the selection of the reference
         * */
        $scope.selectReference = function(ev){
            $mdDialog.show({
                    controller: 'SelectReferenceController',
                    templateUrl: 'views/curate/select.reference.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function( selectReference ) {
                    if( !$scope.act.refs ){
                        $scope.act.refs = [];
                    }
                    $scope.act.refs.push( selectReference );
                }, function() {
                    console.log('nothing was selected from the dialog...');
                });
        };

        /**
         * Opens the dialog for the selection of the reference
         * */
        $scope.selectPolitician = function(ev){
            $mdDialog.show({
                    controller: 'SelectPoliticianController',
                    templateUrl: 'views/curate/select.complice.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function( politician ) {
                    if( !$scope.act.complices ){
                        $scope.act.complices = [];
                    }
                    $scope.act.complices.push( politician );
                }, function() {
                    console.log('nothing was selected from the dialog...');
                });
        };

        /**
         * We remove the reference of the Complice
         * */
        $scope.removeComplice = function( index ){
            // We remove from the array the reference of the complice
            $scope.act.complices.splice( index );
        };

        /**
         * We remove the reference of the Complice
         * */
        $scope.removeReference = function( index ){
            // We remove from the array the reference of the refs
            $scope.act.refs.splice( index );
        };

        /**
         * Callback for the creation of the act
         * */
        $scope.createAct = function(){
            // We send the validation of the data

        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // Getting the reference of the acts
            var actsQuery = firebaseDB.ref('acto').orderByChild('verificado').equalTo( true );
            $scope.corruption_acts = $firebaseArray( actsQuery );

            // We obtain the references for the corruption acts
            $scope.corruption_acts.$loaded(function( data ){
                // For each of the items we update the references of the resource
                if( data.length > 0 ){
                    for( var i = 0, total = data.length; i < total; i ++ ){
                        // We fetch the information for each of the corruption acts
                        (function(index){
                            // We set the references for the reference resolve
                            $scope.corruption_acts[index].refs = $firebaseArray(
                                firebaseDB.ref('referencia').orderByChild('acto')
                                    .equalTo( $scope.corruption_acts[index]['$id'])
                            );

                            // just for debug
                            $scope.corruption_acts[index].refs.$loaded(function( resolv){
                                console.log('information loaded for the refes..');
                                console.log( resolv );
                            })
                        }(i));
                    }
                }
            });
        }

        // We call the loading in the main page
        loadData();

    }

}());