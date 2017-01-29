var unirest = require('unirest');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};


exports.search = (req, res) => {
    // We query the Firebase server response
    unirest.get('https://ethos-9eccd.firebaseio.com/perfil.json')
        .end(function (restRes) {
            if (restRes.error) {
                console.log('GET error', restRes.error);
                return res.status(500).send({
                    message: 'error:' + restRes.error
                })
            } else {
                // We parse the results from the fire-base reference
                var resultArray = [];
                for( var result in restRes.body ){
                    var object = restRes.body[result];
                    object['$id'] = result;

                    // We add the reference to the result array
                    resultArray.push( object );
                }

                // We filter the results by the search query
                var query = req.query.query;
                if( query ){
                    query = query.toLowerCase();
                    resultArray = resultArray.filter(function( result ){
                        if( !result.nombre ){
                            return false;
                        }else{
                            return result.nombre.toLowerCase().includes( query )
                        }
                    });
                }

                // We return the response
                return res.json(resultArray);
            }
        });
};
