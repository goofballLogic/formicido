const express = require( "express" );
const stepDefinitions = require( "./domain/step-definitions" );
const bodyParser = require( "body-parser" );

const origins = {};

module.exports = function( config ) {

    const app = express();
    
    app.use( "/public", express.static( __dirname + "/../public" ) );
    
    app.set( "view engine", "pug" );
    app.set( "views", __dirname + "/views" );
    
    app.get( "/agent", ( req, res ) => {
    
        res.set( "cache-control", "no-cache" );
        res.type( "text/javascript" );
        res.send( `window.addEventListener("message", function(e){ console.log(e.origin,'${config.origin}');if(e.origin!=='${config.origin}'){return};eval(e.data); });` );
        
    } );
    
    app.get( "/", ( req, res ) => {
        
        res.render( "index" );
        
    } );
    
    app.get( "/steps", ( req, res ) => {
        
        res.render( "steps", { stepDefinitions } );
        
    } );
    
    app.get( "/steps/:step", ( req, res ) => {
        
        const { step } = req.params;
        res.render( "step", { step: stepDefinitions[ step ] } );
        
    } );
    
    app.post( "/steps/:step", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
        
        const { step } = req.params;
        const StepDef = stepDefinitions[ step ];
        if ( !StepDef ) { throw new Error( "Step not recognised" ); }
        const instance = new StepDef();
        Promise.resolve()
            .then( () => instance.consume( req.body ) )
            .then( () => [].concat( instance.script() ).join( "\n" ) )
            .then( script => res.send( { script } ) );
            
    } );
    
    return new Promise( ( resolve, reject ) => {

        app.listen( config.port, config.host || "0.0.0.0", e => {
            
            if ( e ) {
                
                reject( e );
                
            } else {
                
                console.log( "Running", config );
                resolve();
                
            }
            
        } );
        
    } );
    
};
