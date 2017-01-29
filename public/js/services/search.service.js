/**
 * Created by Mauricio Lara on 1/28/17.
 */
(function(){
    'use strict';

    angular.module('ethos')
        .factory('SearchService', SearchService);

    //Adding the dependencies
    SearchService.$inject = ['$q', '$http'];

    /**
     * Handler for the current session information
     * */
    function SearchService( $q, $http ){

        //Public API
        return{
            search : search
        };

        /**
         * Search for politicians with a given query
         * */
        function search( query ){
            var searchDefer = $q.defer();

            // We execute the query for the defer
            $http.get('search', {
                params: {
                    query: query
                }
            }).then(function( response ){
                // We return the response
                searchDefer.resolve( response.data );
            }).catch(function( responseError ){
                // We return an error result
                searchDefer.reject();
            });

            // We return the promise of the defer
            return searchDefer.promise;
        }
    }

}());
