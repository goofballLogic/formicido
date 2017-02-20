const { defineSupportCode } = require( "cucumber" );
const index = require( "../../src" );
const testServer = require( "../../fixtures/test-server" );
const config = require( "../config" );
const webdriverio = require( "webdriverio" );

defineSupportCode( function( { registerHandler, Before } ) {
    
    registerHandler( "BeforeFeatures", () => {
        
        // spin up the app server
        return index( config.app )
            // then the test server
            .then( () => testServer( config.test ) );
            
    } );
    
    Before( () => {
        
        this.client = webdriverio.remote( { desiredCapabilities: { browserName: 'firefox' } } );
        return this.client.init();
        
    } );
    
} );