const express = require( "express" );
const bodyParser = require( "body-parser" );
const fs = require( "fs" );
const shortid = require( "shortid" );

const stepDefinitions = require( "./domain/step-definitions" );
const pathDefinitions = require( "./domain/path-definitions" );
const paths = require( "./domain/paths" );

const agentjs = fs.readFileSync( __dirname + "/scripts/agent.js" );

module.exports = function( config ) {

    const configuredAgentJS = agentjs.toString().replace( /\$\{origin\}/g, config.origin );
    const app = express();
    
    app.use( "/public", express.static( __dirname + "/../public" ) );
    app.use( ( req, res, next ) => {
       
       console.log( req.url );
       next();
       
    } );
    
    app.set( "view engine", "pug" );
    app.set( "views", __dirname + "/views" );
    
    app.get( "/agent", ( req, res ) => {
    
        res.set( "cache-control", "no-cache" );
        res.type( "text/javascript" );
        res.send( configuredAgentJS );
        
    } );
    
    app.get( "/", ( req, res ) => {
        
        res.render( "index" );
        
    } );
    
    app.get( "/steps", ( req, res ) => {
        
        res.render( "steps", { stepDefinitions } );
        
    } );
    
    app.get( "/steps/:slug", ( req, res ) => {
        
        const { slug } = req.params;
        const step = stepDefinitions[ slug ];
        if ( !step ) { 
            
            res.status( 404 );
            res.send( "Not found" );
            
        } else {

            res.render( "step", { step } );
            
        }
        
    } );
    
    app.post( "/steps/:slug", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
        
        const { slug } = req.params;
        const step = stepDefinitions[ slug ];
        if ( !step ) {

            res.status( 404 );
            res.send( "Not found" );
            
        } else {

            const instance = new step.class();
            Promise.resolve()
                .then( () => instance.consume( req.body ) )
                .then( script => res.send( instance.script() ) )
                .catch( err => {
                    
                    console.error( err );
                    res.status( 500 ).send( "The server failed processing your request." );
                    
                } );
                
        }
            
    } );
    
    app.get( "/paths", ( req, res ) => {

        res.render( "paths", { paths: [], newId: shortid() } );
        
    } );
    
    app.get( "/paths/:slug", ( req, res ) => {
        
        const { slug } = req.params;
        pathDefinitions.lookup( slug )
            .then( path => res.render( "path", { path, slug, stepDefinitions } ) );
            
    } );
    
    app.post( "/paths/:pathId/add-step", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
        
        const { pathId } = req.params;
        const newStep = stepDefinitions[ req.body[ "new-step" ] ];
        if ( !newStep ) { 
            
            res.status( 400 ).send( "Invalid" );
            
        } else {

            const stepSlug = newStep.slug;
            const stepId = shortid();
            res.redirect( `/paths/${pathId}/step/${stepSlug}/${stepId}` );
            
        }
        
    } );
    
    app.post( "/paths/:pathId/run", ( req, res ) => {
        
        const { pathId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => res.send( path.script() ) )
            .catch( err => {
                    
                console.error( err );
                res.status( 500 ).send( "The server failed processing your request." );
                
            } );
        
    } );
    
    app.get( "/paths/:pathId/step/:stepSlug/:stepId", ( req, res ) => {
        
        const { stepSlug } = req.params;
        const step = stepDefinitions[ stepSlug ];
        const testRunsUrl = `/steps/${stepSlug}`;
        res.render( "add-step", { step, testRunsUrl } );
        
    } );
    
    app.post( "/paths/:pathId/step/:stepSlug/:stepId", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
    
        const { pathId, stepSlug, stepId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => path.fetchOrCreate( stepId, stepSlug )
                .then( pathStep => {
                
                    pathStep.consume( req.body );
                    path.save();
            
                } )
            )
            .then( 
                
                () => res.redirect( `/paths/${pathId}` ),
                e => {
                    
                    console.error( e );
                    res.status( 500 ).send( e.message );
                    
                }
                
            );

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
