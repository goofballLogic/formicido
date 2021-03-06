module.exports = function launchServer() {

    const express = require( "express" );
    const bodyParser = require( "body-parser" );
    const fs = require( "fs" );
    const shortid = require( "shortid" );
    const stepDefinitions = require( "./domain/step-definitions" )();
    const paths = require( "./domain/paths" );
    const scripts = require( "./domain/scripts" );
    const metrics = require( "./domain/metrics" );
    const metricsRouter = require( "./metrics-router" );

    [
        //"./agents/console-metrics",
        "./agents/prometheus-metrics"

    ].forEach( agent => require( agent ) );

    const agentjs = fs.readFileSync( __dirname + "/scripts/agent.js" );
    const config = require( "../config" );
    const handleErrors = res => err => {

        console.error( err );
        res.status( 500 ).send( "The server failed processing your request." );

    };

    const app = express();
    let configuredAgentJS = "";

    app.use( function( req, res, next ) {

        res.setHeader( "Connection", "close" );
        next();

    } );

    app.use( "/public", express.static( __dirname + "/../public" ) );
    app.use( "/metrics", metricsRouter );

    app.set( "view engine", "pug" );
    app.set( "views", __dirname + "/views" );

    app.get( "/agent", ( req, res ) => {

        const origin = config.origin || `${req.protocol}://${req.get( "host" )}`.replace( /:80$/, "" );
        configuredAgentJS = configuredAgentJS || agentjs.toString().replace( /`\$\{origin\}`/g, `"${origin}"` );
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
        const pageClass = "step-page";
        if ( !step ) {

            res.status( 404 );
            res.send( "Not found" );

        } else {

            res.render( "step", { step, pageClass } );

        }

    } );

    app.post( "/steps/:slug", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

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

        paths.listRecent( 25 ).then( paths =>

            res.render( "paths", { paths, newId: shortid() } )

        ).catch( handleErrors( res ) );

    } );

    app.get( "/paths/:pathId", ( req, res ) => {

        const { pathId } = req.params;
        const pageClass = "path-page";
        const decorateDescription = desc => Object.assign( desc, {

            "url": `/paths/${pathId}/step/${desc.slug}/${desc.id}`,
            "deleteUrl": `/paths/${pathId}/step/${desc.slug}/${desc.id}/delete`

        } );
        paths.fetchOrDefault( pathId )
            .then( path => [ path, path.stepDescriptions().map( decorateDescription ) ] )
            .then( ( [ path, descriptions ] ) =>

                path.compensationDescriptions().then( compensations => res.render( "path", {

                    compensations,
                    pageClass,
                    path,
                    pathId,
                    stepDefinitions,
                    steps: descriptions

                } ) )

            )
            .catch( handleErrors( res ) );

    } );

    app.post( "/paths/:pathId", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

        const { pathId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => {

                path.consume( req.body );
                path.save();
                res.redirect( `/paths/${pathId}` );

            } )
            .catch( handleErrors( res ) );

    } );


    app.post( "/paths/:pathId/add-step", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

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

    app.get( "/paths/:pathId/add-compensation", ( req, res ) => {

        const { pathId } = req.params;
        paths.fetchOrCreate( pathId ).then( mainPath =>

            paths.listRecent( 200 ).then( paths => {

                const pathList = paths.filter( path =>

                    path.id !== mainPath.id

                ).map( path => ( {

                    value: path.id,
                    text: path.name,
                    checked: !!~mainPath.compensations.indexOf( path.id )

                } ) );
                res.render( "add-compensation-paths", {

                    mainPath,
                    pathList

                } );

            } ).catch( handleErrors( res ) )

        );

    } );

    app.post( "/paths/:pathId/add-compensation", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

        const { pathId } = req.params;
        const { path: compensations } = req.body;
        paths.fetchOrCreate( pathId )
            .then( path => {

                path.consume( { compensations } );
                return path.save();

            } ).then( () =>

                res.redirect( `/paths/${pathId}` )

            ).catch( handleErrors( res ) );

    } );

    app.post( "/paths/:pathId/run", ( req, res ) => {

        const { pathId } = req.params;
        paths.fetchOrCreate( pathId )
            .then( path => path.generateJS() )
            .then( runDef => res.send( { pathId, paths: runDef } ) )
            .catch( handleErrors( res ) );

    } );

    app.get( "/paths/:pathId/step/:stepSlug/:stepId", ( req, res ) => {

        const { pathId, stepSlug, stepId } = req.params;
        const step = stepDefinitions[ stepSlug ];
        const testRunsUrl = `/steps/${stepSlug}`;
        const pageClass = "step-page";
        paths.fetch( pathId )
            .then( path => path.fetch( stepId ) )
            .catch( () => ( { data: { args: {} } } ) )
            .then( maybeStep => {

                // TODO: fix this orrible mess
                const { args } = maybeStep.data;
                Object.keys( args ).forEach( key => {

                   args[ key ] = [].concat( args[ key ] || [] )[ 0 ];

                } );
                res.render( "edit-step", { step, testRunsUrl, args, pageClass } );

            } );



    } );

    app.get( "/paths/:pathId/step/:stepSlug/:stepId/delete", ( req, res ) => {

        const { pathId, stepId } = req.params;
        paths.fetch( pathId ).then( path =>
            path.fetch( stepId ).then( step =>
                res.render( "delete-step", { step: step.describe() } )
            )
        ).catch( handleErrors( res ) );

    } );

    app.post( "/paths/:pathId/step/:stepSlug/:stepId", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

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

    app.post( "/paths/:pathId/step/:stepSlug/:stepId/delete", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

        const { pathId, stepId } = req.params;
        paths.fetch( pathId )
            .then( path => path.remove( stepId ).then( () => path.save() ) )
            .then( () => res.redirect( `/paths/${pathId}` ) )
            .catch( handleErrors( res ) );

    } );

    app.get( "/scripts", ( req, res ) => {

        scripts.listRecent( 100 ).then( scripts =>

            res.render( "scripts", { scripts, newId: shortid() } )

        ).catch( handleErrors( res ) );

    } );

    app.get( "/scripts/:scriptId", ( req, res ) => {

        const { scriptId } = req.params;
        const newRunUrl = `/scripts/${scriptId}/run/${shortid()}/0`;
        scripts.fetchOrDefault( scriptId ).then( script =>

            paths.listRecent( 200 ).then( paths => {

                const pathList = paths.map( path => ( {

                    value: path.id,
                    text: path.name,
                    checked: !!~script.paths.indexOf( path.id )

                } ) );
                res.render( "script", {

                    newRunUrl,
                    script,
                    scriptId,
                    pathList,
                    paths

                } );

            } )

        ).catch( handleErrors( res ) );

    } );

    app.get( "/scripts/:scriptId/run/:runId/:iteration", ( req, res ) => {

        const { scriptId, runId, iteration } = req.params;
        const nextIteration = parseInt( iteration, 10 ) + 1;
        const nextIterationURL = `/scripts/${scriptId}/run/${runId}/${nextIteration}`;
        const pageClass = "script-run-page";
        scripts.fetch( scriptId ).then( script =>

            script.generateJS().then( pathScripts => {

                res.render( "script-run", {

                    iteration,
                    nextIterationURL,
                    pageClass,
                    pathScripts: JSON.stringify( pathScripts ),
                    runId,
                    scriptId,
                    name: script.name

                } );

            } )

        ).catch( handleErrors( res ) );

    } );

    app.post( "/scripts/:scriptId", bodyParser.json(), bodyParser.urlencoded( { extended: false } ), ( req, res ) => {

        const { scriptId } = req.params;
        scripts.fetchOrCreate( scriptId )
            .then( script => {

                script.consume( req.body );
                script.save();
                res.redirect( `/scripts/${scriptId}` );

            } )
            .catch( handleErrors( res ) );

    } );

    app.post( "/metrics", bodyParser.raw({ type: "*/*" }), ( req, res ) => {

       metrics.publish( JSON.parse( req.body.toString() ) );
       res.send( "ok" );

    } );

    return new Promise( ( resolve, reject ) => {

        const port = config.port || 8080;
        const host = config.host || "0.0.0.0";
        try {

            const server = app.listen( port, host, e => {

                if ( e ) {

                    reject( e );

                } else {

                    console.log( "Running", config );
                    resolve( server );

                }

            } );

        } catch( e ) {

            reject( e );

        }

    } );

};
