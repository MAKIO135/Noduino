var config = require( './config.json' ), //config.json file
    express = require( 'express' ),
    app = express(),
    http = require( 'http' ).Server( app ),
    io = require( 'socket.io' )( http ),
    SerialPort = require( 'serialport' );

/*
	    ______
	   / ____/  ______  ________  __________
	  / __/ | |/_/ __ \/ ___/ _ \/ ___/ ___/
	 / /____>  </ /_/ / /  /  __(__  |__  )
	/_____/_/|_/ .___/_/   \___/____/____/
	          /_/
*/
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

/*
	   _____ ____  ________ __ ____________   ________
	  / ___// __ \/ ____/ //_// ____/_  __/  /  _/ __ \
	  \__ \/ / / / /   / ,<  / __/   / /     / // / / /
	 ___/ / /_/ / /___/ /| |/ /___  / /  _ _/ // /_/ /
	/____/\____/\____/_/ |_/_____/ /_/  (_)___/\____/

*/
var connectCounter = 0;

io.on( 'connection' , function ( socket ) {
	// connection
	connectCounter++;
	console.log( 'nb clients: ' + connectCounter );
	socket.emit( 'connected', { msg: 'Connected' } );

	// deconnection
	socket.on( 'disconnect', function() {
		connectCounter--;
		console.log( 'nb clients: ' + connectCounter );
	} );

    socket.on( 'newClick', function( data ){
        console.log( data );
        io.emit( 'newDate', data );
	} );
} );

/*
	   _____           _       ______             __
	  / ___/___  _____(_)___ _/ / __ \____  _____/ /_
	  \__ \/ _ \/ ___/ / __ `/ / /_/ / __ \/ ___/ __/
	 ___/ /  __/ /  / / /_/ / / ____/ /_/ / /  / /_
	/____/\___/_/  /_/\__,_/_/_/    \____/_/   \__/

*/
// initialize serialPort using port ( "COM3" ) and baud rate ( 9600 ) from config.json file
var serialPort = new SerialPort( config.serialPort, {
    baudrate: config.serialRate,
    parser: SerialPort.parsers.readline( '\n' )
} );

// Serial communication between Node Server and Arduino
serialPort.on( 'open', function () {
    console.log( config.serialPort + ' open' );

    serialPort.on( 'data', function( data ) {
        console.log( 'data received: ' + data );
        io.emit( 'arduinoData', data );
    } );
} );
