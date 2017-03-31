const server = require( "./runtime/headless" ).default;
const { bus } = server;

const metrics = require( "./domain/metrics" );
require( "./agents/prometheus-metrics" );
bus.on( "metrics", x => metrics.publish( JSON.parse( x ) ) );

const MultiRun = require( "./multi-run" );

class Headless {
    
    run( scriptId, options = {} ) {
        
        const runner = new MultiRun( scriptId, options, bus );
        if ( options.continuous ) {
            
            runner.start();
            return Promise.resolve( runner );
            
        } else {
            
            return runner.runOne();
            
        }

    }
    
}
module.exports = Headless;
