/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('CurateEditController', CurateEditController);

    // Inject
    CurateEditController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', '$mdDialog', '$stateParams'];

    /**
     * Controller for the home view of the application
     * */
    function CurateEditController($scope, $firebaseArray, $firebaseObject, $state, $mdDialog, $stateParams) {

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

                    // We check if the object is already in the complices
                    var alreadySet = false;
                    for(var i = 0; i < $scope.act.complices.length; i++) {
                        if ($scope.act.complices[i]['$id'] == politician['$id']) {
                            alreadySet = true;
                            break;
                        }
                    }

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
        $scope.editAct = function(){
            // building the reference dialog
            var involved = {};
            for(var i = 0; i < $scope.act.complices.length; i++) {
                involved[ $scope.act.complices[i]['$id'] ] = true;
            }

            var references = {};
            for(var i = 0; i < $scope.act.refs.length; i++) {
                references[ $scope.act.refs[i]['$id'] ] = true;
            }

            // We send the validation of the data
            var newAct = {
                categoria: 'Categoria',
                fecha: $scope.act.fecha,
                involucrados: involved,
                referencias: references,
                resumen: $scope.act.resumen,
                titulo: $scope.act.titulo,
                verificado: false
            };

            /* creating the key for the new reference information */
            var newActReference = firebase.database().ref().child('acto').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/acto/' + newActReference] = newAct;

            // We update the reference data
            firebase.database().ref().update(updates);
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            // Getting the information of the acta
            $scope.actaId = $stateParams.actaId;

            // Getting the reference of the firebase database
            var firebaseDB = firebase.database();

            // Getting the reference of the current act
            var actQuery = firebaseDB.ref('acto').child( $scope.actaId );
            $scope.act = $firebaseObject( actQuery );

            // We obtain the references for the corruption acts
            $scope.act.$loaded(function( data ){
                // Setting the data
                $scope.act.fecha = new Date( $scope.act.fecha );

                // For each of the involved we input the data
                if( data.involucrados ){
                    // We start the reference for the involved
                    $scope.act.complices= [];

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