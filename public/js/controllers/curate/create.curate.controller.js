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

                    // We check if the object is already in the reference
                    var alreadySet = false;
                    for(var i = 0; i < $scope.act.refs.length; i++) {
                        if ($scope.act.refs[i]['$id'] == newReference['$id']) {
                            alreadySet = true;
                            break;
                        }
                    }

                    if( !alreadySet ){
                        $scope.act.refs.push( newReference );
                    }
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
                    // We check if the object is already in the reference
                    var alreadySet = false;
                    for(var i = 0; i < $scope.act.refs.length; i++) {
                        if ($scope.act.refs[i]['$id'] == selectReference['$id']) {
                            alreadySet = true;
                            break;
                        }
                    }

                    // If the object is not in the array we add it
                    if( !alreadySet ){
                        $scope.act.refs.push( selectReference );
                    }
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

                    console.log('Setting the politician');
                    // We check if the object is already in the complices
                    var alreadySet = false;
                    for(var i = 0; i < $scope.act.complices.length; i++) {
                        if ($scope.act.complices[i]['$id'] == politician['$id']) {
                            alreadySet = true;
                            break;
                        }
                    }

                    console.log('already set: ' + alreadySet);

                    if(!alreadySet){
                        $scope.act.complices.push( politician );
                    }
                }, function() {
                    console.log('nothing was selected from the dialog...');
                });
        };

        /**
         * We remove the reference of the Complice
         * */
        $scope.removeComplice = function( politician ){

            // We remove the complice
            var index;
            for(var i = 0; i < $scope.act.complices.length; i++) {
                if ($scope.act.complices[i]['$id'] == politician['$id']) {
                    index = i;
                    break;
                }
            }

            // We remove from the array the reference of the complice
            $scope.act.complices.splice( index );
        };

        /**
         * We remove the reference of the Complice
         * */
        $scope.removeReference = function( reference ){
            // We remove the reference
            var index;
            for(var i = 0; i < $scope.act.refs.length; i++) {
                if ($scope.act.refs[i]['$id'] == reference['$id']) {
                    index = i;
                    break;
                }
            }

            // We remove from the array the reference of the refs
            $scope.act.refs.splice( index );
        };

        /**
         * Callback for the creation of the act
         * */
        $scope.createAct = function(){
            // building the reference dialog
            var involved = {};
            for(var i = 0; i < $scope.act.complices.length; i++) {
                involved[ $scope.act.complices[i]['$id'] ] = true;
            }

            var references = {};
            for(var i = 0; i < $scope.act.refs.length; i++) {
                var obj = {};
                references[ $scope.act.refs[i]['$id'] ] = true;
            }

            // We send the validation of the data
            var newAct = {
                categoria: 'Categoria',
                fecha: $scope.act.fecha,
                involucrados: involved,
                referencias: references,
                resumen: $scope.act.resumen,
                titulo: $scope.act.title,
                verificado: false
            };

            console.log('object a crear...');
            console.log( newAct );

            /* creating the key for the new reference information */
            var newActReference = firebase.database().ref().child('acto').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/acto/' + newActReference] = newAct;

            // We update the reference data
            firebase.database().ref().update(updates);

            console.log('Finished the reference data')
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            //var firebaseDB = firebase.database();

            //// Getting the reference of the acts
            //var actsQuery = firebaseDB.ref('acto').orderByChild('verificado').equalTo( true );
            //$scope.corruption_acts = $firebaseArray( actsQuery );
            //
            //// We obtain the references for the corruption acts
            //$scope.corruption_acts.$loaded(function( data ){
            //    // For each of the items we update the references of the resource
            //    if( data.length > 0 ){
            //        for( var i = 0, total = data.length; i < total; i ++ ){
            //            // We fetch the information for each of the corruption acts
            //            (function(index){
            //                // We set the references for the reference resolve
            //                $scope.corruption_acts[index].refs = $firebaseArray(
            //                    firebaseDB.ref('referencia').orderByChild('acto')
            //                        .equalTo( $scope.corruption_acts[index]['$id'])
            //                );
            //
            //                // just for debug
            //                $scope.corruption_acts[index].refs.$loaded(function( resolv){
            //                    console.log('information loaded for the refes..');
            //                    console.log( resolv );
            //                })
            //            }(i));
            //        }
            //    }
            //});
        }

        // We call the loading in the main page
        loadData();

    }

}());