const program = require( "commander" );

const argv = global.argv || process.argv; // test seam

program
    .version( require( "../package.json" ).version );

program
    .command( "run [script-id]" )
    .description( "Run a script (continuously). Specify the id of the script to run." )
    .option( "-r, --repo [file-path])", "File path where script definitions are located" )
    .option( "-d, --diagnostics [file-path]", "File path to diagnostics folder" )
    .option( "-p, --port [port]", "Port from which to serve metrics" )
    .option( "-o, --one", "Just run the script once")
    .option( "-ls, --log-script-events", "Log script events" )
    .action( runScript );

program
    .command( "launch" )
    .description( "Launch the configuration server" )
    .option( "-p, --port [port]", "Port on which to launch the server" )
    .option( "-o, --origin [authority]", "Origin for web messaging API messages (e.g. http://localhost:8888)" )
    .option( "-h, --host [host]", "Host for server (e.g. 0.0.0.0)" )
    .option( "-r, --repo [file-path]", "File path where script definitions are located" )
    .action( launchServer );

program.parse( argv );

if ( !program.args.length ) {

    program.help();

}

function report( scriptResult ) {

    const { script } = scriptResult;
    const { start, end, scriptId: id, name } = script;
    const elapsed = ( end - start ) / 1000;
    console.log( `Script complete: ${id} "${name}" (${elapsed} seconds)` );

}

function updateConfig( config ) {

    // inject properties into the global config module
    // this only works because config exposes a singleton and index only executes once
    Object.assign( require( "../config" ), config );

}


function ensureRepoOption( command ) {

    if ( !command.repo ) {

        console.error( "\nERROR: You must specify the file-path where script data is stored (using the --repo argument)." );
        command.help();

    }

}

function launchServer( command ) {

    ensureRepoOption( command );
    const server = require( "./server" );
    const { port, origin, repo, host } = command;
    const config = {};
    if ( port ) { config.port = port; }
    if ( origin ) { config.origin = origin; }
    if ( repo ) { config.repo = repo; }
    config.host = host || "0.0.0.0";
    updateConfig( config );
    return server();

}

function runScript( scriptId, command ) {

    if ( !scriptId ) { program.help(); }
    ensureRepoOption( command );
    const { diagnostics: filePath, port, one, repo } = command;
    const config = {

        diagnostics: { filePath },
        continuous: !one

    };
    if ( port ) { config.port = port; }
    if ( repo ) { config.repo = repo; }
    updateConfig( config );

    const headless = require( "./headless" );
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
