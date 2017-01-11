/*
 SensorShieldlib
 documentation: https://github.com/MAKIO135/sensorshieldlib
 download: https://github.com/MAKIO135/sensorShieldLib/archive/master.zip
 ***************************

 ArduinoCode
 ***************
 Basic example with SensorShieldLib for Hello Serial and Arduino To Browser

 Lionel Radisson - @Makio135
*/

#include <sensorShieldLib.h>

SensorShield board;

void setup()
{
    board.init(); // always needed first, initialises and start Serial with 9600 baudrate

    // you can set digital/analog pins ranges if working with a board different from Arduino UNO configuration
    // example with arduino MEGA:
    // board.setDigitalPinsRange( 2, 53 ); //digital pins 0 & 1 are required for Serial Communication
    // board.setAnalogPinsRange( A0, A15 );

    // add analog/digital sensors,
    board.addSensor( "btn", 8, INPUT_PULLUP );
    board.addSensor( "pot", A0 );

    // set minimal change on analog sensor before sending new value
    board.setSensorSensitivity( "pot1", 10 );

    // connect a led on pin 13 that will lightup when sending JSON
    board.emitLightOnChange( 13 );
}

void loop()
{
    board.update();
    // checks continuously if any sensor changed
    // if so, sends a JSON with all sensors and their value:
    // {"btn":1,"pot":768}
}
