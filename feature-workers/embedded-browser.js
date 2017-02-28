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
    
    navigateTo( url ) {
        
        const { port } = this.world.config.test;
        url = url.replace( /\$\{root\}/g, `http://localhost:${port}` );
        const { client } = this.world;
        return client.setValue( "#embedded-browser-controls > input", url )
            .then( () => client.click( "#embedded-browser-controls button" ) )
            .then( () => client.frame( "embedded-browser" ) )
            .then( () => client.waitUntil( () => client.execute( "return location.href;" ).then( result => result.value === url ), 5000 ) )
            .then( 
                
                () => client.frame( null ),
                err => {
                    
                    client.frame( null );
                    throw err;
                    
                }
                
            );
        
    }
    
}
module.exports = EmbeddedBrowser;
