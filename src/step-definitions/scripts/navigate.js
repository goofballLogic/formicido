/* global frame, url */

return new Promise( function( resolve, reject ) {

    var isActive = true;
    var giveup = setTimeout( function() {
        
        if ( isActive ) {
        
            isActive = false;
            frame.removeEventListener( "load", waiter );
            reject( "Timed out" );
               
        }
        
    }, 10000 );
    
    function waiter() { 
        
        if ( isActive ) {
        
            frame.removeEventListener( 'load', waiter );
            clearTimeout( giveup );
            resolve();
            
        }
        
    }
    frame.addEventListener('load', waiter);
    frame.setAttribute( "src", url );
    
} );
