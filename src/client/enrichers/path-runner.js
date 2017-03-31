export default function( ns ) {

    const { bus, notify } = ns;

    bus.on( "run-path", detail => {

        const { stepScripts, id, name } = detail;
        const pathId = id;
        const context = detail.context || {};
        context.path = { pathId, name };
        
        let bookmark = 0;
        
        function nextStep( detail ) {
            
            const err = detail ? detail.step.err : null;
            if ( err ) {
                    
                context.path.errorSteps = context.path.errorSteps || [];
                detail.step.errStack = err.stack;
                context.path.errorSteps.push( detail.step );
                    
            }
            if ( !err && bookmark < stepScripts.length ) {

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
