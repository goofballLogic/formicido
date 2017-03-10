export default function( ns ) {
    
    const { bus, notify } = ns;

    bus.on( "initiate-script", function( script ) {

        const { pathScripts, nextIterationURL } = script;
        
        var outcome = document.querySelector( "#script-outcome" );
        outcome.innerHTML = "";
        function recordOutcome( html ) { if ( outcome ) { outcome.innerHTML += "<br />" + html; } }
        
        var transcript = document.querySelector( "#script-transcript" );
        var bookmark = 0;
        var paths = pathScripts.map( x => {
        
            var pathElement = document.createElement( "li" );
            pathElement.innerHTML = x.name;
            transcript.appendChild( pathElement );
            return pathElement;
        
        } );
    
        function nextPath() {
            
            if ( bookmark < paths.length ) { 
                
                paths[ bookmark ].classList.add( "running" );
                bus.emit( "run-path", pathScripts[ bookmark ] );
                bookmark++;
            
            } else {
                
                scriptComplete();
                
            }
                
        }
    
        function pathComplete( detail ) {
            
            var path = paths[ bookmark - 1 ];
            path.classList.remove( "running" );
            if ( detail.err ) {
                
                recordOutcome( "path " + bookmark + " error: " + detail.err );
                path.classList.add( "error" );
                
            } else {
                
                path.classList.add( "success" );
                
            }
            setTimeout( nextPath, 1000 );
            
        }
        
        function scriptComplete() {
            
            bus.removeListener( "path-complete", pathComplete );
            script.end = Date.now();
            bus.emit( "script-complete", script );
            notify( "Script run complete" );
            var stopper = document.querySelector( "#stop" );
            if ( !stopper.checked ) {
                
                window.location.replace( nextIterationURL );
                
            } else {
                
                document.body.classList.add( "paused" );
                
            }
            
        }
            
        if ( paths.length < 1 ) { 
            
            recordOutcome( "No paths to run" );
            
        } else {
        
            script.start = Date.now();
            bus.on( "path-complete", pathComplete );
            nextPath();
            
        }
    
    } );
    
}
