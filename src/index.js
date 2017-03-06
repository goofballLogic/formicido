const express = require( "express" );
const bodyParser = require( "body-parser" );
const fs = require( "fs" );
const shortid = require( "shortid" );

const stepDefinitions = require( "./domain/step-definitions" );
const paths = require( "./domain/paths" );

const agentjs = fs.readFileSync( __dirname + "/scripts/agent.js" );

module.exports = function( config ) {

    const configuredAgentJS = agentjs.toString().replace( /\$\{origin\}/g, config.origin );
    const app = express();
    const handleErrors = res => err => {
                    
        console.error( err );
        res.status( 500 ).send( "The server failed processing your request." );
                    
    };
    
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
                .catch( handleErrors( res ) );
                
        }
            
    } );
    
    app.get( "/paths", ( req, res ) => {

        paths.listRecent( 10 ).then( paths => 

            res.render( "paths", { paths, newId: shortid() } )
            
        ).catch( handleErrors( res ) );
        
    } );
    
    app.get( "/paths/:pathId", ( req, res ) => {
        
        const { pathId } = req.params;
        const decorateDescription = desc => Object.assign( desc, { 
            
            "url": `/paths/${pathId}/step/${desc.slug}/${desc.id}`,
            "deleteUrl": `/paths/${pathId}/step/${desc.slug}/${desc.id}/delete`
            
        } );
        paths.fetchOrDefault( pathId )
            .then( path => [ path, path.stepDescriptions().map( decorateDescription ) ] )
            .then( ( [ path, descriptions ] ) => res.render( "path", { 
                
                path, 
                pathId, 
                stepDefinitions, 
                steps: descriptions 
                
            } ) )
            .catch( handleErrors( res ) );
            
    } );
    
    app.post( "/paths/:pathId", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
        
        const { pathId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => {
                
                path.consume( req.body );
                path.save();
                res.redirect( `/paths/${pathId}` );
                
            } )
            .catch( handleErrors( res ) );
        
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
            .catch( handleErrors( res ) );
        
    } );
    
    app.get( "/paths/:pathId/step/:stepSlug/:stepId", ( req, res ) => {
        
        const { stepSlug } = req.params;
        const step = stepDefinitions[ stepSlug ];
        const testRunsUrl = `/steps/${stepSlug}`;
        res.render( "add-step", { step, testRunsUrl } );
        
    } );
    
    app.get( "/paths/:pathId/step/:stepSlug/:stepId/delete", ( req, res ) => {
        
        const { pathId, stepId } = req.params;
        paths.fetch( pathId ).then( path => 
            path.fetch( stepId ).then( step => 
                res.render( "delete-step", { step: step.describe() } )
            )
        ).catch( handleErrors( res ) );
            
    } );
    
    app.post( "/paths/:pathId/step/:stepSlug/:stepId", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
    
        const { pathId, stepSlug, stepId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => path.fetchOrCreate( stepId, stepSlug )
                .then( pathStep => {
                
                    pathStep.consume( req.body );
                    return path.save();
            
                } )
            )
            .then( () => res.redirect( `/paths/${pathId}` ) )
            .catch( handleErrors( res ) );

    } );
    
    app.post( "/paths/:pathId/step/:stepSlug/:stepId/delete", bodyParser.json(), bodyParser.urlencoded(), ( req, res ) => {
        
        const { pathId, stepId } = req.params;
        paths.fetch( pathId )
            .then( path => path.remove( stepId ).then( () => path.save() ) )
            .then( () => res.redirect( `/paths/${pathId}` ) )
            .catch( handleErrors( res ) );
        
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
