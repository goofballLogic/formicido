const program = require( "commander" );

program
    .version( require( "../package.json" ).version );
    
program
    .command( "run [script-id]" )
    .description( "Run a script (continuously). Specify the id of the script to run." )
    .option( "-d, --diagnostics [filePath]", "File path to diagnostics folder" )
    .option( "-p, --port [port]", "Port from which to serve metrics" )
    .option( "-o, --one", "Just run the script once")
    .option( "-ls, --log-script-events", "Log script events" )
    .action( runScript );

program.parse( process.argv );

if ( !program.args.length ) {
    
    program.help();
    
}

function report( scriptResult ) {
    
    const { script } = scriptResult;
    const { start, end, scriptId: id, name } = script;
    const elapsed = ( end - start ) / 1000;
    console.log( `Script complete: ${id} "${name}" (${elapsed} seconds)` );
    
}

function runScript( scriptId, command ) {

    if ( !scriptId ) { program.help(); }

    const { diagnostics: filePath, port, one } = command; 
    const config = { 
        
        diagnostics: { filePath },
        continuous: !one
        
    };
    if ( port ) { config.port = port; }
    
    const headless = require( "." )( config, true );
    
    if ( command.logScriptEvents ) {
        
        headless.bus.on( "script-complete", detail => report( detail ) );
        
    }
    
    headless
        .run( scriptId, config )
        .then( maybeResult => {
            
        if ( maybeResult.script && !maybeResult.current ) {
        
            report( maybeResult );
            return null;
            
        } else {
            
            return maybeResult;
            
        }
            
    } ).then(
        
        maybeMultiRun => {
            
            if ( maybeMultiRun ) {
                
                console.log( "Running..." );
                
            } else {
                
                process.exit();
                
            }
            
        }
            
    ).catch(
        
        err => console.error( err.stack ) 
        
    );
    
}
