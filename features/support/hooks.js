const { defineSupportCode } = require( "cucumber" );
const testServer = require( "../../fixtures/test-server" );
const config = require( "../config" );
const webdriverio = require( "webdriverio" );
const World = require( "./world" );

function defaultBuild() {
    
    return `dev ${new Date().toDateString()}`;
    
}

function updateConfig( injectedProperties ) {
    
    Object.assign( require( "../../config" ), injectedProperties );
    
}

defineSupportCode( function( { setWorldConstructor, setDefaultTimeout, registerHandler, Before, After } ) {

    setWorldConstructor( World );

    setDefaultTimeout(60 * 1000);    
    
    let browserStackClient = null;
    
    function initBrowserStack() {
        
        if ( !~process.argv.indexOf( "--headless" ) ) { 
            
            try {
                
                browserStackClient = webdriverio.remote( { 
        
                    desiredCapabilities: {
        
                        browserName: 'Chrome',
                        os: "Windows",
                        os_version: "8",
                        project: "Formicido",
                        build: process.env.BROWSERSTACK_BUILD || defaultBuild(),
                        "browserstack.local": true,
                        "browserstack.debug": true,
                        resolution: "1280x1024"
        
                    },
                    host: 'hub.browserstack.com',
                    port: 80,
                    user: process.env.BROWSERSTACK_USERNAME,
                    key: process.env.BROWSERSTACK_ACCESS_KEY,
    
        
                } );
                return browserStackClient.init();
                
            } catch( e ) {
                
                browserStackClient = null;
                return Promise.reject( e );
                
            }
            
        }

    }
    
    registerHandler( "BeforeFeatures", () => {

        return Promise.all( [
          
            updateConfig( config.app ),
            testServer( config.test, config.app ),
            initBrowserStack()
          
        ] );

    } );
    
    registerHandler( "AfterFeatures", () => {
        
        if ( browserStackClient ) {
            
            console.log( "Ending browserstack connection" );    
            const x = browserStackClient.end().then( () => {
                
                console.log( "Browserstack connection closed" );
                return Promise.resolve();
                
            }, e => {
                
                console.error( e );
                throw e;
                
            } );
            return x;
            
        }

    } );
    
    Before( function() {
        
        this.client = browserStackClient;
        this.defaultServer = this.runner.startDefaultServer();

    } );
    
    After( function() {
        
        return Promise.all( [
        
            this.headless.dispose(),
            this.runner.dispose()
            
        ] );

    } );

} );
