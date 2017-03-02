const fs = require( "fs" );
const js = fs.readFileSync( __dirname + "/scripts/click-then-wait-for-new-location.js" ).toString();
const StepBase = require( "./step-base" );

class ClickThenWaitForNewLocation extends StepBase {
    
    constructor() { super( js ); }

    static get stepName() { return "Click then wait for new location"; }
    static get shape() { return [
        
        { label: "Query selector", name: "query-selector", type: "text" }
        
    ] }
    
    consume( variables ) {
     
        this.args.selector = variables[ "query-selector" ][ 0 ];
        
    }
    
}

module.exports = ClickThenWaitForNewLocation;
