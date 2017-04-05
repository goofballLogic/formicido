const { spawn } = require( "child_process" );
const path = require( "path" );
const location = path.resolve( __dirname, "../src/cli" );

class CLI {
    
    constructor( world ) {
        
        this.world = world;
    
    }
    
    defaultArgsTo( args ) {
    
        this.defaultArgs = args.split( " " );
        
    }
    
    executeScript( scriptId ) {

        this.stdout = this.stderr = "";
        this.exited = false;
        
        const args = [ location, "run", scriptId ].concat( this.defaultArgs || [] );
        if ( args.every( arg => !/^--diagnostics/.test( arg ) ) ) {
            
            args.push( "--diagnostics", path.resolve( "../data/diagnostics" ) );
            
        }
        if ( args.every( arg => !/^--port/.test( arg ) ) ) {
            
            args.push( "--port", this.world.config.headless.port );
            
        }
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
    
    dispose() {
        
        if ( this.current && !this.exited ) {
        
            this.current.kill();
            return new Promise( resolve => {
                
                const poll = () => {
                    
                    if ( this.current && !this.exited ) {
                        
                        setTimeout( poll, 100 );
                        
                    } else {
                        
                        resolve();
                        
                    }
                    
                }
                poll();
                
            } );
            
        }
        
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

}
module.exports = CLI;
