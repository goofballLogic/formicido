export default function( ns ) {
    
    const { bus, notify } = ns;
    
    bus.on( "run-script", script => {
    
        let bookmark = 0;
        const { pathScripts, nextIterationURL } = script;
        const outcome = { scriptId: script.id, nextIterationURL };
        function nextPath() {
            
            if ( bookmark < pathScripts.length ) { 
                
                bus.emit( "run-path", { context: { path: bookmark + 1  }, ...pathScripts[ bookmark ] } );
                bookmark++;
            
            } else {
                
                bus.removeListener( "path-complete", pathComplete );
                outcome.end = Date.now();
                bus.emit( "script-complete", outcome );
                notify( "Script run complete" );
                
            }
                
        }
    
        function pathComplete( detail ) {
            
            setTimeout( nextPath, 1000 );
            
        }
        
        if ( pathScripts.length < 1 ) { 
            
            notify( "No paths to run" );
            
        } else {
        
            outcome.start = Date.now();
            bus.on( "path-complete", pathComplete );
            nextPath();
            
        }
    
    } );
    
}