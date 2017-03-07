document.addEventListener( "click", function( e ) {
    
    if ( !( e.target && e.target.classList.contains( "clear-button" ) ) ) { return; }
    var elements = document.querySelectorAll( e.target.getAttribute( "data-selectors" ) );
    elements.forEach( ele => {
        
        if ( ele.innerHTML ) { ele.innerHTML = ""; }
        if ( ele.value ) { ele.value = ""; }
        
    } );
        
} );

document.addEventListener( "fetch-result", function( e ) {
    
    var outcome = document.querySelector( "#outcome" );
    outcome.innerHTML = "";
    function recordOutcome( html ) { if ( outcome ) { outcome.innerHTML += "<br />" + html; } }
    var transcript = document.querySelector( "#transcript" );
    transcript.innerHTML = "";
    
    var json = e.detail;
    if ( json.length < 1 ) { 
        
        recordOutcome( "Done. (no steps to run)" );
        
    } else {
    
        var steps = json.map( x => {
            
            var s = document.createElement( "li" );
            s.innerHTML = x.description;
            transcript.appendChild( s );
            return s;
            
        } );
        
        var bookmark = 0;
        function nextStep() {
            
            if ( bookmark < steps.length ) { 
                
                steps[ bookmark ].classList.add( "step-running" );
                document.dispatchEvent( new CustomEvent( "run-script", { detail: json[ bookmark ] } ) );
                bookmark++;
            
            } else {
                
                pathComplete();
                
            }
                
        }
        
        function pathStepComplete( outcomeEvent ) {
            
            var step = steps[ bookmark - 1 ];
            if ( outcomeEvent.detail.err ) {
                
                recordOutcome( "Step " + bookmark + " error: " + outcomeEvent.detail.err );
                step.classList.add( "step-error" );
                
            } else {
                
                step.classList.add( "step-success" );
                
            }
            nextStep();
            
        }
        
        document.addEventListener( "run-complete", pathStepComplete );
        function pathComplete() {
            
            document.removeEventListener( "run-complete", pathStepComplete );
            document.dispatchEvent( new CustomEvent( "info-message", { detail: "Path run complete" } ) );
            document.dispatchEvent( new CustomEvent( "path-complete", { detail: json } ) );
            
        }
    
        nextStep();
        
    }

} );