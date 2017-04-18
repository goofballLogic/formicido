export default function( ns ) {

    const { bus, notify } = ns;
    const aborted = {};
    const instance = Math.random();

    bus.on( "abort-run", detail => {

        notify( `script-runner ${instance} received abort-run ${detail}` );
        aborted[ detail.id ] = Date.now();
        setTimeout( () => delete aborted[ detail.id ], 60000 );

    } );

    bus.on( "run-script", script => {

        let bookmark = 0;
        const { pathScripts, nextIterationURL, runId, name } = script;
        const { pathIds, paths } = pathScripts;
        const scriptId = script.id;
        const context = { script: { scriptId, name, nextIterationURL, runId } };

        function nextPath() {

            const isAborted = runId in aborted;
            if ( isAborted ) { bus.emit( "run-script-aborted", context ); }
            if ( bookmark < pathIds.length && !isAborted ) {

                context.script.path = bookmark + 1;
                bus.emit( "run-path", { context, pathId: pathIds[ bookmark ], paths } );
                bookmark++;

            } else {

                bus.removeListener( "path-complete", pathComplete );
                context.script.end = Date.now();
                delete context.path;
                bus.emit( "script-complete", context );
                notify( "Script run complete" );

            }

        }

        function pathComplete( detail ) {

            const { pathId, start, errorSteps } = detail.path;
            if ( errorSteps ) {

                context.script.errorPaths = context.script.errorPaths || [];
                context.script.errorPaths.push( { pathId, start, errorSteps } );

            }
            setTimeout( nextPath, 1000 );

        }

        if ( pathIds.length < 1 ) {

            notify( "No paths to run" );

        } else {

            context.script.start = Date.now();
            bus.on( "path-complete", pathComplete );
            nextPath();

        }

    } );

}