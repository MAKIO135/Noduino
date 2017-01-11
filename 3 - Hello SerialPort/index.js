var config = require( './config.json' ), // cf config.json file
    SerialPort = require( 'serialport' );

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
    } );
} );
