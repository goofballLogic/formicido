const headless = require( "../src/headless" );
const assert = require( "assert" );
const request = require( "request" );
/*
    ^formicido_script__             must start with this string
    (?:
        [^_]*                       any character except underscore
        |                           or
        _(?!_)                      an underscore which isn't followed by another
    )*                              as many matches as possible
    __collected                     must end with this string (including trailing space)
    (.*)$                           capture everything after the space up to the end of the string
*/
const scriptMetricFormat = /^formicido_script__(?:[^_]*|_(?!_))*__collected (.*)$/; 

class Headless {
    
    constructor( world ) {
        
        this.world = world;
        this.headless = new headless();
        
    }
    
    run( scriptId ) {
        
        return this.headless.run( scriptId ).then( result => {
            
            this.result = result;
            
        } );
        
    }
    
    runContinuous( scriptId ) {

        const { headless } = this.world.config;
        const options = Object.assign( { continuous: true }, headless );
        return this.headless.run( scriptId, options ).then( run => {
            
            this.run = run;
            
        } );
        
    }
    
    expectSuccessfulRun() {

        const { script } = this.result;
        const { errorPaths } = script;
        assert.ok( !(errorPaths && errorPaths.length), JSON.stringify( script.errorPaths, null, 3 ) );
        
    }
    
    fetchMetric( metricPattern ) {
        
        const { host, port } = this.world.config.headless;
        const url = `http://${host}:${port}/metrics`;
        return new Promise( ( resolve, reject ) => 
        
            request( url, ( e, res, body ) => {
            
                if ( e ) { reject( e ); } else {
                    
                    const lines = body.split( "\n" );
                    const maybeMatch = lines.find( x => metricPattern.test( x ) );
                    if ( maybeMatch ) { 
                        
                        const data = metricPattern.exec( maybeMatch )[ 1 ];
                        resolve( data );
                        
                    } else {
                        
                        reject();
                        
                    }
                    
                }
            
            } )
            
        );
        
    }
    
    waitForEvent( eventName, expectedCount ) {
        
        return new Promise( resolve => {

            const poll = () => {

                if ( this.run.count( eventName ) < expectedCount ) {

                    setTimeout( poll, 350 );

                } else {

                    this.run.stop();
                    resolve();

                }

            }; 
            poll();

        } );

    }
    
    waitForScriptCollectedMetric( count ) {

        return new Promise( resolve => {
            
            const poll = () => this.fetchMetric( scriptMetricFormat ).then( metric => {
                    
                let parsed = null;
                try { parsed = parseInt( metric, 10 ); } catch( ex ) { parsed = null; }
                if ( parsed >= count ) {
                    
                    resolve();
                    
                } else {
                    
                    setTimeout( poll, 250 );
                    
                }
                
            }, e => {
                
                setTimeout( poll, 250 );
                
            } );
            poll();
            
        } );
        
    }
    
}

module.exports = Headless;
