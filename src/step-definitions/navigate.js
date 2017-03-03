const fs = require( "fs" );
const js = fs.readFileSync( __dirname + "/scripts/navigate.js" ).toString();
const StepBase = require( "./step-base" );

class Navigate extends StepBase {
    
    static get stepName() { return "Navigate"; }
    static get shape() { return [ 
        
        { label: "URL", name: "url", type: "url" }
        
    ]; }
    
    constructor() { super( js ); }
    
    consume( variables ) {

        this.args.url = variables.url;
        
    }
    
}

console.log( new Navigate().sci );
module.exports = Navigate;
