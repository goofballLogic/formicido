export default function( ns ) {
    
    const { bus, notify } = ns;

console.log( "RUN SCRIPT" );    
    bus.on( "run-script", script => {
    
        let bookmark = 0;
console.log( "SCRIPT", script );        
        const { pathScripts, nextIterationURL, runId, name } = script;
        const scriptId = script.id;
        const context = { script: { scriptId, name, nextIterationURL, runId } };
        
        function nextPath() {

            if ( bookmark < pathScripts.length ) { 
                
                context.script.path = bookmark + 1;
                bus.emit( "run-path", { context, ...pathScripts[ bookmark ] } );
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
        
        if ( pathScripts.length < 1 ) { 
            
            notify( "No paths to run" );
            
        } else {
        
            context.script.start = Date.now();
            bus.on( "path-complete", pathComplete );
            nextPath();
            
        }
    
    } );
    
}