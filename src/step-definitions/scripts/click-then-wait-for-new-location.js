/*global remote, poll, selector */

var fetchLocationScript = "reply( null, { location: document.location.toString(), readyState: document.readyState } );";
var clickBySelectorScript = [
    
    "var state = document.readyState",
    "reply( state === 'complete' ? null : new Error( 'Loading not complete: ' + state ) )", // reply before click so that we don't have a race condition due to the browser window navigating away
    "document.querySelector(" + JSON.stringify( selector ) + ").click();"

].join( ";\n" );

return Promise.resolve().then( function() {
    
    // get original location
    return remote( fetchLocationScript, 500 );
        
} ).then( function( initialState ) {

    
    return remote( clickBySelectorScript, 1000 ).then( function() {

        // while new location is empty or equal original location or document is still loading (timeout 5s)
        return poll( 250, 5000, function() {

            // get new location                
            return remote( fetchLocationScript, 1000 ).then( function( newState ) { 

                return newState 
                    && ( newState.readyState === "complete" ) 
                    && ( newState.location !== initialState.location );
                    
            } );
            
        } );
            
    } );
  
} );
