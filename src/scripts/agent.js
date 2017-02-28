window.addEventListener( "message", function( e ) { 
    
    var debugOutput = document.querySelector( "#debug" );
    function log() {
        
        if ( debugOutput ) { debugOutput.innerHTML = [].join.call( arguments, " " ); }
        else { console.log.apply( console, arguments ); }
        
    }
    var origin = `${origin}`;
    log( "Agent received", e, e.origin, origin );
    if( e.origin !== origin ){ return; }
    
    var cid = e.data && e.data.cid;
    
    function reply( err ) {

        log( "Agent replying to", cid, err );
        window.parent.postMessage( { 
            
            type: "agent-response", 
            cid: e.data.cid,
            isSuccess: !err,
            args: err ? err.stack : [].slice.call( arguments, 1 )
            
        }, e.origin );
        
    }
    
    try {
    
        log( "Agent running", cid );    
        var func = new Function( "reply", e.data.js );
        func( reply );
        
    } catch( e ) {
        
        reply( e );
        
    }
    
} );