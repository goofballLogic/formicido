/*global remote, poll, selector */

return Promise.resolve().then( function() {
    
    // get original location
    var script = "reply( null, document.location.toString() );";
    return remote( script, 500 );
        
} ).then( function( originalLocation ) {

    // reply before click so that we don't have a race condition due to the browser window navigating away
    var script = "reply(); document.querySelector(" + JSON.stringify( selector ) + ").click();";
    return remote( script, 1000 ).then( function() {
            
        // while new location is empty or equal original location (timeout 5s)
        var script = "reply( null, document.location.toString() );";
        return poll( 250, 5000, function() {

            // get new location                
            return remote( script, 1000 ).then( function( newLocation ) { 
                    
                return newLocation && ( newLocation !== originalLocation );
                    
            } );
            
        } );
            
    } );
  
} );
