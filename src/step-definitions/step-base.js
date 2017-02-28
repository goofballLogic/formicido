class StepBase {
    
    constructor( js ) {
        
        this.js = js;
        this.args = {};
        
    }
    
    consume( variables ) {

        throw new Error( "Implement consume( variables ) to set arguments to your script" );        

    }
    
    script() {
        
        return { 
            
            script: this.js,
            args: this.args
            
        };
        
    }
    
}
module.exports = StepBase;
