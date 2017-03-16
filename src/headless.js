const Zombie = require( "zombie" );
const scripts = require( "./domain/scripts" );
const server = require( "./runtime/server" ).default;
const { bus, options } = server;

bus.on( "error-message", message => console.error( message ) );
bus.on( "warn-message", message => console.warn( message ) );
bus.on( "info-message", message => console.log( message ) );

class Headless {
    
    run( scriptId ) {
        
        const browser = new Zombie();
        return scripts.fetch( scriptId )
            .then( script => script.generateJS() )
            .then( pathScripts => new Promise( ( resolve, reject ) => {
                
                bus.on( "navigate-to", ( [ url ] ) => browser.visit( url ).then( 
                    
                    () => bus.emit( "navigate-to-complete", {} ),
                    err => bus.emit( "navigate-to-complete", { err } )
                    
                ) );
                bus.once( "script-complete", context => {

                    resolve( context );
                    
                } );
                bus.emit( "run-script", { id: scriptId, pathScripts } );                
                
            } ) );

    }
    
}
module.exports = Headless;
