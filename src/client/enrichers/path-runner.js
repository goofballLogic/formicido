export default function( ns ) {

    const { bus, notify } = ns;
    const aborted = {};
    const instance = Math.random();

    bus.on( "abort-run", detail => {
    
        notify( `path-runner ${instance} received abort-run ${detail}` );
        aborted[ detail.id ] = Date.now();
        setTimeout( () => delete aborted[ detail.id ], 60000 );
        
    } );
    

    bus.on( "run-path", detail => {

        const { stepScripts, id, name } = detail;
        const pathId = id;
        const context = detail.context || {};
        const { runId } = context.script || {};
        context.path = { pathId, name };
        
        let bookmark = 0;
        
        function nextStep( detail ) {

            const isAborted = runId in aborted;
            if ( isAborted ) { bus.emit( "run-path-aborted", context ); }
            const err = detail ? detail.step.err : null;
            if ( err ) {
                    
                context.path.errorSteps = context.path.errorSteps || [];
                detail.step.errStack = err.stack;
                context.path.errorSteps.push( detail.step );
                    
            }
            if ( !err && bookmark < stepScripts.length && !isAborted ) {

                bus.once( "step-complete", nextStep );
                context.path.step = bookmark + 1;
                const message = { context, ...stepScripts[ bookmark ] };
                bookmark++;
                bus.emit( "run-step", message );
            
            } else {

                context.path.end = Date.now();
                notify( "Path run complete" );
                delete context.step;
                bus.emit( "path-complete", context );
                
            }
                
        }
        
        if ( !( stepScripts && stepScripts.length ) ) { 
            
            notify( "No steps specified" );
            
        } else {
        
            context.path.start = Date.now();
            nextStep();

        }
    
    } );

}
