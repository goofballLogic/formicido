export default function( ns ) {

    const { bus, notify } = ns;

    function runPath( detail ) {

        var outcome = document.querySelector( "#outcome" );
        outcome.innerHTML = "";
        function recordOutcome( html ) { if ( outcome ) { outcome.innerHTML += "<br />" + html; } }
        var transcript = document.querySelector( "#transcript" );
        transcript.innerHTML = "";

        var stepScripts = detail.stepScripts;
        var id = detail.id;
        
        if ( !( stepScripts && stepScripts.length ) ) { 
            
            recordOutcome( "Done. No steps specified." );
            notify( "No steps specified" );
            
        } else {
        
            var steps = stepScripts.map( x => {
                
                var s = document.createElement( "li" );
                s.innerHTML = x.description;
                transcript.appendChild( s );
                return s;
                
            } );
            
            var bookmark = 0;
            function nextStep() {
                
                if ( bookmark < steps.length ) { 

                    
                    steps[ bookmark ].classList.add( "running" );
                    bus.once( "step-complete", pathStepComplete );
                    bus.emit( "run-step", stepScripts[ bookmark ] );
                    bookmark++;
                
                } else {
                    
                    pathComplete();
                    
                }
                    
            }
            
            function pathStepComplete( detail ) {

                var step = steps[ bookmark - 1 ];
                step.classList.remove( "running" );
                if ( detail.err ) {

                    recordOutcome( "Step " + bookmark + " error: " + detail.err );
                    step.classList.add( "error" );
                    
                } else {
                    
                    step.classList.add( "success" );
                    
                }
                nextStep();
                
            }
        
            var start = Date.now();   
            nextStep();

            function pathComplete() {
                
                var end = Date.now();
                var outcome = { path: stepScripts, id: id, start: start, end: end };
                notify( "Path run complete" );
                bus.emit( "path-complete", outcome );

            }
        
        }
    
    }
    bus.on( "run-path", runPath );

}
