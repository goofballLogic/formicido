const MultiRun = require( "./multi-run" );
const server = require( "./runtime/headless" ).default;
const { bus } = server;

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
