/*global remote, poll, querySelector */

return Promise.resolve().then( function() {
    
    // get original location
    var script = "reply( null, document.location.toString() );";
    return remote( script );
        
} ).then( function( originalLocation ) {

    // click
    var script = "document.querySelector(" + JSON.stringify( querySelector ) + ").click(); reply();";
    return remote( script, 200 ).then( function() {
            
        // while new location is empty or equal original location (timeout 5s)
        var script = "reply( null, document.location.toString() );";
        return poll( 250, 5000, function() {

            // get new location                
            return remote( script ).then( function( newLocation ) { 
                    
                return newLocation && ( newLocation !== originalLocation );
                    
            } );
            
        } );
            
    } );
  
} );
