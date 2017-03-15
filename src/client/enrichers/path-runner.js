export default function( ns ) {

    const { bus, notify } = ns;

    bus.on( "run-path", detail => {

        const { stepScripts, id, context } = detail;
        
        let bookmark = 0;
        let start;
        
        function nextStep() {
            
            if ( bookmark < stepScripts.length ) {

                bus.once( "step-complete", nextStep );
                const message = { context: { step: bookmark + 1 }, ...stepScripts[ bookmark ] };
                bus.emit( "run-step", message );
                bookmark++;
            
            } else {
                
                var end = Date.now();
                var outcome = { path: stepScripts, pathId: id, start, end, context };
                notify( "Path run complete" );
                bus.emit( "path-complete", outcome );
                
            }
                
        }
        
        if ( !( stepScripts && stepScripts.length ) ) { 
            
            notify( "No steps specified" );
            
        } else {
        
            start = Date.now();
            nextStep();

        }
    
    } );

}
