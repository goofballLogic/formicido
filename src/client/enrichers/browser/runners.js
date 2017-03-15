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
    
    bus.on( "script-complete", function( detail ) {
        
        const { nextIterationURL } = detail.script;
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
        
        const { err } = detail.path;
        const { path } = detail.script || {};
        
        const scriptOutcome = document.querySelector( ".script-outcome" ) || {};
        const outcome = document.querySelector( ".path-outcome" ) || {};
        outcome.innerHTML = `Complete. ${err || ""}`;
        if ( path && paths && paths.length ) {
        
            const pathElement = paths[ path - 1 ];
            pathElement.classList.remove( "running" );
            scriptOutcome.innerHTML = "Complete.";
            pathElement.classList.add( err ? "error" : "success" );
            
        } 
            
    } );


    bus.on( "run-step", detail => {

        const outcome = document.querySelector( ".step-outcome" ) || {};
        outcome.innerHTML = "Running...";
        if ( steps && steps.length ) {
            
            const pathContext = detail.context.path;
            steps[ pathContext.step - 1 ].classList.add( "running" );
            
        }
        
    } );
    
    bus.on( "step-complete", detail => {

        const { err } = detail.step;
        const step = detail.path ? detail.path.step : "";
        const outcome = document.querySelector( ".step-outcome" ) || {};
        if ( steps && steps.length ) {
        
            const stepElement = steps[ step - 1 ];
            stepElement.classList.remove( "running" );
            if ( err ) {

                stepElement.classList.add( "error" );
                outcome.innerHTML += `Step ${step}: ${err}\n`;
                
            } else {
                
                stepElement.classList.add( "success" );
                
            }
            
        } else {
            
            outcome.innerHTML = `Complete. ${err || ""}`;
            
        }

    } );
    
}