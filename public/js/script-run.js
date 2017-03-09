/*global CustomEvent*/
document.addEventListener( "initiate-script", function( e ) {
    
    var counter = 0;
    var outcome = document.querySelector( "#script-outcome" );
    outcome.innerHTML = "";
    function recordOutcome( html ) { if ( outcome ) { outcome.innerHTML += "<br />" + html; } }
    var transcript = document.querySelector( "#script-transcript" );
    var scripts = e.detail.scripts;
    var nextIterationURL = e.detail.nextIterationURL;    

    var bookmark = 0;
    var paths = scripts.map( x => {
        
        var pathElement = document.createElement( "li" );
        pathElement.innerHTML = x.name;
        transcript.appendChild( pathElement );
        return pathElement;
        
    } );
    
    function nextPath() {
        
        if ( bookmark < paths.length ) { 
            
            paths[ bookmark ].classList.add( "running" );
            document.dispatchEvent( new CustomEvent( "run-path", { detail: scripts[ bookmark ].script } ) );
            bookmark++;
        
        } else {
            
            scriptComplete();
            
        }
            
    }
    
    function pathComplete( outcomeEvent ) {
        
        var path = paths[ bookmark - 1 ];
        path.classList.remove( "running" );
        if ( outcomeEvent.detail.err ) {
            
            recordOutcome( "path " + bookmark + " error: " + outcomeEvent.detail.err );
            path.classList.add( "error" );
            
        } else {
            
            path.classList.add( "success" );
            
        }
        setTimeout( nextPath, 1000 );
        
    }
    
    function scriptComplete() {
        
        document.removeEventListener( "path-complete", pathComplete );
        document.dispatchEvent( new CustomEvent( "info-message", { detail: "Script run complete" } ) );
        var stopper = document.querySelector( "#stop" );
        if ( !stopper.checked ) {
            
            window.location.replace( nextIterationURL );
            
        } else {
            
            document.body.classList.add( "paused" );
            
        }
        
    }

    function runScript() {
        
        document.addEventListener( "path-complete", pathComplete );
        nextPath();
        
    }
        
    if ( paths.length < 1 ) { 
        
        recordOutcome( "No paths to run" );
        
    } else {
    
        runScript();
        
    }
    
} );