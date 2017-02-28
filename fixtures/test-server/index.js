const express = require( "express" );
module.exports = function( config, appConfig ) {

    const app = express();
    const agentUrl = `http://${appConfig.host}:${appConfig.port}/agent`;
    
    app.set( "view engine", "pug" );
    app.set( "views", __dirname + "/views" );
    
    app.get( "/hello-world", ( req, res ) => {
        
        res.send( "Hello world" );
        
    } );
    
    app.get( "/some-links", ( req, res ) => {

        res.render( "some-links", { agentUrl } );
        
    } );
    
    app.get( "/some-links/poem", ( req, res ) => {

       res.render( "a-poem", { agentUrl } );
       
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
