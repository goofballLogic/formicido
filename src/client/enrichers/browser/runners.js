export default function( ns ) {

    const { bus, error } = ns;

    let paths;
    bus.on( "run-script", function( script ) {

        const { pathScripts } = script;
        var transcript = document.querySelector( ".script-transcript" );
        paths = pathScripts.pathIds.map( pathId => {

            const path = pathScripts.paths[ pathId ];
            var pathElement = document.createElement( "li" );
            pathElement.innerHTML = path.name;
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

        const { pathId, paths } = detail;
        const { stepScripts } = paths[ pathId ];
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

        const { errorSteps } = detail.path;
        const { path } = detail.script || {};
        const isError = errorSteps && errorSteps.length;
        const scriptOutcome = document.querySelector( ".script-outcome" ) || {};
        const outcome = document.querySelector( ".path-outcome" ) || {};
        const errors = ( errorSteps || [] ).map( x => x.err );
        outcome.innerHTML = [ "Complete." ].concat( errors ).join( "<br />" );

        if ( isError ) { error( errors.join( "<br />" ) ); }
        if ( path && paths && paths.length ) {

            const pathElement = paths[ path - 1 ];
            pathElement.classList.remove( "running" );
            scriptOutcome.innerHTML = "Complete.";
            pathElement.classList.add( isError ? "error" : "success" );

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