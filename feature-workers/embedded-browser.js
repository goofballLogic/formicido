const assert = require( "assert" );

class EmbeddedBrowser {
    
    constructor( world ) {
        
        this.world = world;
        
    }
    
    expectLocation( expected ) {
        
        const { client, config } = this.world;
        expected = expected.replace( /\$\{root\}/g, `http://localhost:${config.test.port}` );
        return client.getAttribute( "#embedded-browser", "src" )
            .then( result => assert.equal( result, expected ) );
            
    }
    
    expectContent( expected ) {
        
        const { client } = this.world;
        return client.frame( "embedded-browser" )
            .then( () => client.getHTML( "body", true ) )
            .then( html => assert( ~html.indexOf( expected ), `"${expected}"" not found in "${html}"` ) )
            .then( () => client.frame( null ) );
            
    }
    
}
module.exports = EmbeddedBrowser;
