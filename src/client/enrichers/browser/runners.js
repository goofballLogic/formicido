export default function( ns ) {
    
    const { bus } = ns;
    
    let paths;
    bus.on( "run-script", function( script ) {
    
        const { pathScripts } = script;
        var transcript = document.querySelector( ".script-transcript" );
        paths = pathScripts.map( x => {
        
            var pathElement = document.createElement( "li" );
            pathElement.innerHTML = x.name;
            transcript.appendChild( pathElement );
            return pathElement;
        
        } );
        
    } );
    
    bus.on( "script-complete", function( script ) {
        
        const { nextIterationURL } = script;
        const stopper = document.querySelector( "#stop" );
        if ( !stopper.checked ) {
                
            window.location.replace( nextIterationURL );
                
        } else {
                
            document.body.classList.add( "paused" );
            
        }
            
    } );
    
    let steps;
    bus.on( "run-path", detail => {
    
        const { stepScripts } = detail;
        const transcript = document.querySelector( ".path-transcript" );
        const outcome = document.querySelector( ".path-outcome" ) || {};
        outcome.innerHTML = "Running...";
        transcript.innerHTML = "";
        steps = stepScripts.map( x => {
            
            var s = document.createElement( "li" );
            s.innerHTML = x.description;
            transcript.appendChild( s );
            return s;
            
        } );
        
    } );
    
    bus.on( "path-complete", detail => {
        
        const { context, err } = detail;
        
        const scriptOutcome = document.querySelector( ".script-outcome" ) || {};
        const outcome = document.querySelector( ".path-outcome" ) || {};
        outcome.innerHTML = `Complete. ${err}`;
        if ( paths && paths.length ) {
        
            const path = paths[ context.path - 1 ];
            path.classList.remove( "running" );
            if ( detail.err ) {
                
                scriptOutcome.innerHTML += `<br />Path ${context.path}: ${err}`;
                path.classList.add( "error" );
                
            } else {
                
                outcome.innerHTML = `Complete`;
                path.classList.add( "success" );
                    
            }
            
        } 
            
    } );


    bus.on( "run-step", detail => {

        const outcome = document.querySelector( ".step-outcome" ) || {};
        outcome.innerHTML = "Running...";
        if ( steps && steps.length ) {
        
            const { context } = detail;
            steps[ context.step - 1 ].classList.add( "running" );
            
        }
        
    } );
    
    bus.on( "step-complete", detail => {

        const { context, err } = detail;
        const outcome = document.querySelector( ".step-outcome" ) || {};
        if ( steps && steps.length ) {
        
            const step = steps[ context.step - 1 ];
            step.classList.remove( "running" );
            if ( err ) {

                step.classList.add( "error" );
                outcome.innerHTML += `Step ${context.step}: ${err}\n`;
                
            } else {
                
                step.classList.add( "success" );
                
            }
            
        } else {
            
            outcome.innerHTML = `Complete. ${err || ""}`;
            
        }

    } );
    
}