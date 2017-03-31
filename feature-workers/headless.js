const headless = require( "../src/headless" );
const assert = require( "assert" );

class Headless {
    
    constructor( world ) {
        
        this.world = world;
        this.headless = new headless();
        
    }
    
    run( scriptId ) {
        
        return this.headless.run( scriptId ).then( result => {
            
            this.result = result;
            
        } );
        
    }
    
    runContinuous( scriptId ) {
        
        return this.headless.run( scriptId, { continuous: true } ).then( run => {
            
            this.run = run;
            
        } );
        
    }
    
    expectSuccessfulRun() {

        const { script } = this.result;
        const { errorPaths } = script;
        assert.ok( !(errorPaths && errorPaths.length), JSON.stringify( script.errorPaths, null, 3 ) );
        
    }
    
    waitForEvent( eventName, expectedCount ) {
        
        
        return new Promise( resolve => {
        
            const poll = () => {

                if ( this.run.count( eventName ) < expectedCount ) {
                    
                    setTimeout( poll, 350 );
                    
                } else {
                    
                    this.run.stop();
                    resolve();
                    
                }
                
            }; 
            poll();
            
        } );
        
    }
    
}

module.exports = Headless;
