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
    
    expectSuccessfulRun() {

        const { script } = this.result;
        assert.ok( !script.err, JSON.stringify( script, null, 3 ) );
        
    }
    
}

module.exports = Headless;
