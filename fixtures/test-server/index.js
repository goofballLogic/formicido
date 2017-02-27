const express = require( "express" );

module.exports = function( config ) {

    const app = express();
    
    
    
    app.get( "/hello-world", ( req, res ) => {
        
        res.send( "Hello world" );
        
    } );
    
    
    
    
    
    
    
    
    
    return new Promise( ( resolve, reject ) => {
        
        app.listen( config.port, e => {
            
            if ( e ) {
                
                reject( e );
                
            } else {
                
                resolve();
                
            }
            
        } );
        
    } );
    
};
