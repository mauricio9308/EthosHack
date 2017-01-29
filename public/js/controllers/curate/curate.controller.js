/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function () {

    angular.module('ethos').controller('CurateController', CurateController);

    // Inject
    CurateController.$inject = ['$scope', '$firebaseArray', '$state'];

    /**
     * Controller for the home view of the application
     * */
    function CurateController($scope, $firebaseArray, $state) {

        $scope.dataLoaded = false;

        /**
         * We go to the act edition view
        * */
        $scope.editAct = function( act ){
            $state.go('act-edit', {
                actaId: act['$id']
            })
        };

        /**
         * Callback for the vote of the yes of an act
         * */
        $scope.actVoteYes = function( act ){
            var ref = firebase.database().ref('/acto/' + act['$id']);
            ref.on("value", function(snapshot) {
                var values = {};
                if (snapshot.val() != null) {
                    values = snapshot.val();
                }

                values.verificado = true;

                // We save the values in fire-base
                firebase.database().ref("/acto/" + act['$id']).set(values);
            }, function (errorObject) {
                console.log("FATAL: The update of the act failed: " + errorObject.code);
            });
        };

        /**
         * Callback for the vote of the no of an act
         * */
        $scope.actVoteNo = function( act ){
            // We remove the reference from the array
            var index;
            for(var i = 0; i < $scope.corruption_acts.length; i++) {
                if ($scope.corruption_acts[i]['$id'] == act['$id']) {
                    index = i;
                    break;
                }
            }

            // We remove the item from the list
            $scope.corruption_acts.splice( index );
        };

        /**
         * Function for the information fetch from fire-base
         * */
        function loadData() {
            var firebaseDB = firebase.database();

            // Getting the reference of the acts
            var actsQuery = firebaseDB.ref('acto').orderByChild('verificado').equalTo( false );
            $scope.corruption_acts = $firebaseArray( actsQuery );

            // We obtain the references for the corruption acts
            $scope.corruption_acts.$loaded(function( data ){
                $scope.dataLoaded = true;

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