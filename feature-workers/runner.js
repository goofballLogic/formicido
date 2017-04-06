const { spawn } = require( "child_process" );
const path = require( "path" );
const fs = require( "fs-extra" );
const request = require( "request" );
const server = require( "../src/server" );

const location = path.resolve( __dirname, "../src/index.js" );
const testRepoLocation = path.resolve( __dirname, "../data/runner-tests" );

class runner {
    
    constructor( world ) {
        
        this.world = world;
    
    }
    
    defaultArgsTo( args ) {
    
        this.defaultArgs = args.split( " " );
        
    }
    
    addDefaultRepoArg() {
        
        return new Promise( ( resolve, reject ) => {
            
            fs.ensureDir( testRepoLocation, e => {
                
                if ( e ) { reject( e ); } else {

                    this.defaultArgs = this.defaultArgs || [];
                    this.defaultArgs.push( "--repo", testRepoLocation );
                    resolve();
                    
                }
                
            } );
        
        } );
        
    }
    
    executeCLI( args ) {
        
        this.stdout = this.stderr = "";
        this.exited = false;
        console.log( "Spawning node", args.join( " " ) );
        this.current = spawn( "node", args, { stdio: [ "pipe", "pipe", "pipe" ] } );
        this.current.stdout.on( "data", data => { 
            
            console.log( data.toString().replace( /\n$/, "" ) );
            this.stdout = this.stdout + data.toString();
        
        } );
        this.current.stderr.on( "data", data => { 
            
            console.error( data.toString().replace( /\n$/, "" ) );    
            this.stderr = this.stderr + data.toString();
        
        } );
        this.current.on( "error", e => { this.err = e; } );
        this.current.on( "exit", x => { 
            
            this.exited = true;
            this.exitCode = x; 
            
        } );
        
    }
    
    executeScriptViaCLI( scriptId ) {

console.log( this.defaultArgs );
        const args = [ location, "run", scriptId ].concat( this.defaultArgs || [] );
        if ( args.every( arg => !/^--diagnostics/.test( arg ) ) ) {
            
            args.push( "--diagnostics", path.resolve( "../data/diagnostics" ) );
            
        }
        if ( args.every( arg => !/^--port/.test( arg ) ) ) {
            
            args.push( "--port", this.world.config.headless.port );
            
        }
        this.executeCLI( args );
        
    }
    
    launchServerViaCLI() {
        
        const args = [ location, "launch" ].concat( this.defaultArgs || [] );
        this.executeCLI( args );
        return new Promise( resolve => {
        
            const poll = () => {
                
                if ( /Running/.test( this.stdout ) ) {
                    
                    resolve();
                    
                } else {
                
                    setTimeout( poll, 100 );
                    
                }
                
            };
            poll();
            
        } );
        
    }
    
    startDefaultServer() {
        
        if ( !~process.argv.indexOf( "--headless" ) ) {
        
            return server().then( 
                
                httpServer => {
                    
                    this.server = httpServer;
                    this.server.on( "connection", socket => {
                        
                        socket.setKeepAlive( false, 0 );
                        
                    } );
                    this.server.unref();
                
                }, 
                e => { throw e; }
                
            );
            
        }

    }
    
    dispose() {
        
        const promises = [];
        if ( this.current && !this.exited ) {
        
            promises.push( new Promise( resolve => {
        
                this.current.kill();        
                const poll = () => {
                    
                    if ( this.current && !this.exited ) {
                        
                        setTimeout( poll, 100 );
                        
                    } else {
                        
                        resolve();
                        
                    }
                    
                };
                poll();
                
            } ) );
            
        }
        if ( this.server ) {
            
            promises.push( new Promise( ( resolve, reject ) => {
                
                this.server.close( e => {
                    
                    if ( e ) { reject( e ); } else { 
                        
                        this.server = null;
                        resolve();
                    
                    }
                    
                } );
                
            } ) );
            
        }
        return Promise.all( promises );
        
    }
    
    expectOutput( expected, expectedCount ) {
        
        return new Promise( ( resolve, reject ) => {
            
            const poll = () => {

                const actualCount = ( this.stdout || "" ).split( expected ).length - 1;
                if( actualCount >= expectedCount ) {
                    
                    resolve();
                    
                } else {

                    if ( this.current && !this.exited ) {
                        
                        setTimeout( poll, 1000 );
                        
                    } else {
                        
                        const debuggery = [ 
                            
                            "process exited",
                            this.stderr,
                            this.stdout,
                            "Exit code: " + this.exitCode,
                            this.err ? "Spawn error: " + this.err: null
                        
                        ].filter( x => !!x );
                        reject( debuggery.join( "\n" ) );
                        
                    }
                    
                }
                
            };
            poll();
            
        } );
        
    }
    
    expectAgent( url, expectedOrigin ) {
        
        return new Promise( ( resolve, reject ) => {

            request( url, ( e, res, body ) => {
                
                if ( e ) { reject( e ); } else {
                
                    const expected = new RegExp( `^\\s*var origin = "${expectedOrigin}";`, "m" );
                    if ( expected.test( body ) ) {
                        
                        resolve();
                        
                    } else {
                        
                        reject( new Error( `Expected: ${expected}, actual: ${body}` ) );
                        
                    }

                }
                
            } );

        } );
        
    }
    
    expectURLToResolveSuccessfully( url ) {
        
        return new Promise( ( resolve, reject ) => {
            
            request( url, ( e, res ) => {
                
                if ( e ) { reject( e ); } else {
                    
                    if ( res.statusCode === 200 ) {
                        
                        resolve();
                        
                    } else {
                        
                        reject( `Expected status 200. Actual: ${res.statusCode}` );
                        
                    }
                    
                }
                
            } );
            
        } );
        
    }

}
module.exports = runner;
