const fs = require( "fs" );
const script = fs.readFileSync( __dirname + "/scripts/click-then-wait-for-new-location.js" ).toString();

class ClickThenWaitForNewLocation {
    
    static get stepName() { return "Click then wait for new location"; }
    static get shape() { return [
        
        { label: "Query selector", name: "query-selector", type: "text" }
        
    ] }
    
    consume( variables ) {
        
        this.selector = variables[ "query-selector" ][ 0 ];
        
    }
    
    script() {
        
        return { script, args: { querySelector: this.selector } };
        
    }
    
}

module.exports = ClickThenWaitForNewLocation;
