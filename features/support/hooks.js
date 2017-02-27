const { defineSupportCode } = require( "cucumber" );
const index = require( "../../src" );
const testServer = require( "../../fixtures/test-server" );
const config = require( "../config" );
const webdriverio = require( "webdriverio" );
const World = require( "./world" );

defineSupportCode( function( { setWorldConstructor, setDefaultTimeout, registerHandler, Before } ) {

    setWorldConstructor( World );

    setDefaultTimeout(60 * 1000);    
    
    let browserStackClient = null;
    
    function initBrowserStack() {
        
        try {
            
            browserStackClient = webdriverio.remote( { 
    
                desiredCapabilities: {
    
                    browserName: 'Chrome',
                    os: "Windows",
                    os_version: "8",
                    project: "Formicido",
                    "browserstack.local": true,
                    "browserstack.debug": true
    
                },
                host: 'hub.browserstack.com',
                port: 80,
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY
    
            } );
            return browserStackClient.init();
            
        } catch( e ) {
            
            browserStackClient = null;
            return Promise.reject( e );
            
        }

    }
    
    registerHandler( "BeforeFeatures", () => {

        return Promise.all( [
          
          index( config.app ),
          testServer( config.test ),
          initBrowserStack()
          
        ] );

    } );
    
    registerHandler( "AfterFeatures", () => {
        
    
        console.log( "Ending browserstack connection" );    
        const x = browserStackClient.end().then( () => {
            
            console.log( "Browserstack connection closed" );
            return Promise.resolve();
            
        }, e => {
            
            console.error( e );
            throw e;
            
        } );
        return x;

    } );
    
    Before( function() {
        
        this.client = browserStackClient;

    } );
    

} );
