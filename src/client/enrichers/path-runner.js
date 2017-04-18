export default function( ns ) {

    const { bus, notify } = ns;
    const aborted = {};
    const instance = Math.random();

    /*
        runId: the id of the current run (e.g. a script run)
        stepScripts: the steps to run for this path
        compensations: the ids of paths to attempt to compensate for a failure (such as session timed out)
        pathDetail: id of the path to run, and a dictionary of path definitions
    */
    function runPath( { runId, stepScripts, compensations, pathDetail } ) {

        const { context, continuation } = pathDetail;
        const { path } = context;

        const compensationAttempts = pathDetail.compensations = pathDetail.compensations || {};

        let bookmark = 0;

        // run a single step within the current path
        function nextStep( detail ) {

            const isAborted = runId in aborted;
            if ( isAborted ) { bus.emit( "run-path-aborted", context ); }
            const err = detail ? detail.step.err : null;
            if ( err ) {

                // an error occurred - record diagnostics
                path.errorSteps = path.errorSteps || [];
                detail.step.errStack = err.stack;
                path.errorSteps.push( detail.step );

            }
            if ( !err && bookmark < stepScripts.length && !isAborted ) {

                // no error and step completed, so we can move on to the next one
                bus.once( "step-complete", nextStep );
                path.step = bookmark + 1;
                const message = { context, ...stepScripts[ bookmark ] };
                bookmark++;
                bus.emit( "run-step", message );

            } else {

                path.end = Date.now();
                let compensation = null;
                if ( err && compensations ) {

                    // can we compensate for this error?
                    const unattempted = compensations.filter( x => !( x in compensationAttempts ) );
                    compensation = unattempted[ 0 ];

                }
                if ( compensation ) {

                    notify( "Attempting compensation: " + compensation );
                    const continuation = compensationContext => {

                        compensationAttempts[ compensation ] = JSON.parse( JSON.stringify( compensationContext ) );
                        bus.emit( "run-path", pathDetail );

                    };
                    const compensationPathDetail = Object.assign( {}, pathDetail, { continuation, pathId: compensation } );
                    bus.emit( "run-path", compensationPathDetail );

                } else {

                    if ( continuation ) {

                        // this path was instructed to invoke a continuation upon completion (e.g. because it was a compensation path)
                        notify( "Path with continuation run complete" );
                        continuation( context );

                    } else {

                        notify( "Path run complete" );
                        delete context.step;
                        context.path.compensations = pathDetail.compensations;
                        bus.emit( "path-complete", context );

                    }

                }

            }

        }
        path.start = Date.now();
        nextStep();

    }

    bus.on( "abort-run", detail => {

        notify( `path-runner ${instance} received abort-run ${detail}` );
        aborted[ detail.id ] = Date.now();
        setTimeout( () => delete aborted[ detail.id ], 60000 );

    } );


    bus.on( "run-path", pathDetail => {

        const { pathId, paths } = pathDetail;
        const { stepScripts, name, compensations } = paths[ pathId ] || {};
        if ( !( stepScripts && stepScripts.length ) ) {

            notify( "No steps specified" );

        }

        const context = pathDetail.context = pathDetail.context || {};
        const { runId } = context.script || {};
        context.path = { name, pathId };
        runPath( {

            compensations,
            pathDetail,
            runId,
            stepScripts

        } );


    } );

}
