var config = require( './config.json' ), //config.json file
    express = require( 'express' ),
    app = express(),
    http = require( 'http' ).Server( app );

// Create the HTTP Server
http.listen( config.serverPort, function(){
    console.log( 'listening on', config.serverPort );
} );


// Tell the app where the files are and what page to serve depending on routes
app.use( express.static( __dirname + '/public' ) );

// http://localhost:8000/
app.get( '/', function( req, res ){
    res.sendFile( 'index.html' );
} );

// http://localhost:8000/index2.html
app.get( '/:name', function( req, res ){
    var fileName = req.params.name;
    res.sendFile( fileName, { root: __dirname + '/public/' }, function ( err ) {
        if ( err ) {
            console.log( err );
            res.status( err.status ).end();
        } else {
            console.log( 'Sent:', fileName );
        }
    } );
} );
