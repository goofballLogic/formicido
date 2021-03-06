const server = require( "./runtime/headless" ).default;
const { bus } = server;

const metrics = require( "./domain/metrics" );
require( "./agents/prometheus-metrics" );
bus.on( "metrics", x => metrics.publish( JSON.parse( x ) ) );

const FileDiagnostics = require( "./agents/file-diagnostics" );
const diagnostics = new FileDiagnostics( bus );

const MultiRun = require( "./multi-run" );

class Headless {

    constructor() {

        this.bus = bus;

    }

    run( scriptId, options = {} ) {

        diagnostics.configure( options );
        const runner = new MultiRun( scriptId, options, bus );
        if ( options.continuous ) {

            runner.start();
            return Promise.resolve( runner );

        } else {

            return runner.runOne().then( result => {

                return runner.dispose().then( () => result );

            } );

        }

    }

}
module.exports = new Headless();
