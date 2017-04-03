export default function( ns ) {
    
    const { bus, browser } = ns;
 
    bus.on( "step-complete", detail => {
 
        const { script, path, step } = detail;
        if ( step && step.err ) {
 
            const window = browser.tabs.current;
            const location = window.location.toString();
            const content = window.document.documentElement.outerHTML;
            const disposition = "step-error";
            const pathId = path && path.pathId;
            const scriptId = script && script.scriptId;
            const now = Date.now();
            const report = {
              
                content,
                detail,
                disposition,
                location,
                now,
                path: script && script.path,
                pathId,
                step: path && path.step,
                scriptId
                
            };
            bus.emit( "diagnostic-report", report );
            
        }

    } );
    
}