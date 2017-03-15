const assert = require( "assert" );

class Step{
    
    constructor( world ) { this.world = world; }
    
    expectOutcome( expected ) {
    
        const { client } = this.world;
        return client.getText( ".step-outcome" ).then( actual => assert.equal( actual, expected ) );
        
    }
    
    expectOutcomeContains( expected ) {
        
        const { client } = this.world;
        return client.getText( ".step-outcome" ).then( actual => assert( !!~actual.indexOf( expected ), `${expected} not found in ${actual}` ) );
        
    }
    
}
module.exports = Step;
