window.addEventListener( 'load', function(){
	var socket = io();

	socket.on( 'connected', function( data ){
		document.querySelector( 'p' ).innerText = data.msg;
	} );

    // send an event 'newClick' when clicking with mouse on body, send Date.now() as data
    document.body.addEventListener( 'click', function(){
        console.log( 'click' );
        var data = { date: Date.now() };
        socket.emit( 'newClick', data );
    }, false );

	socket.on( 'newDate', function( data ){
        console.log( data );
		document.querySelector( 'p' ).innerText = data.date;
	} );

	socket.on( 'arduinoData', function( data ){
        console.log( data );
		document.querySelector( 'p' ).innerText = data;
	} );
} );
