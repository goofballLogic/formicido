/* global frame, url */

return new Promise( function( resolve ) {

    function waiter() { 
        
        frame.removeEventListener( 'load', waiter );
        resolve();
        
    }
    frame.addEventListener('load', waiter);
    frame.setAttribute( "src", url );
    
} );
