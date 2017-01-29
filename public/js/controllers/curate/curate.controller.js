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

        /**
         * We go to the act edition view
        * */
        $scope.editAct = function( act ){
            $state.go('act-edit', {
                actId: act['$id']
            })
        };


        /**
         * Callback for the vote of the yes of an act
         * */
        $scope.actVoteYes = function( act ){
            console.log('act yes....');
            console.log( act );

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
            console.log('actno....');
            console.log( act );

            var ref = firebase.database().ref('/acto/' + act['$id']);
            ref.on("value", function(snapshot) {
                var values = {};
                if (snapshot.val() != null) {
                    values = snapshot.val();
                }

                values.verificado = false;

                // We save the values in fire-base
                firebase.database().ref("/acto/" + act['$id']).set(values);
            }, function (errorObject) {
                console.log("FATAL: The update of the act failed: " + errorObject.code);
            });
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