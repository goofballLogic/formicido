const stepDefinitions = require( "./step-definitions" );

class PathStep {
    
    constructor( data ) {
        
        const { step } = data;
        this.data = data;
        if ( !(step in stepDefinitions) ) {

            throw new Error( "Unrecognised: " + step );
            
        } else {
            
            this.step = stepDefinitions[ step ];
            
        }
        
    }
    
    consume( data ) {

        this.data.args = data;
            
    }
    
    script() {
        
        const instance = new this.step.class();
        instance.consume( this.data.args );
        return instance.script();
         
    }
    
    serialize() {
        
        return this.data;
        
    }
    
}
module.exports = PathStep;
