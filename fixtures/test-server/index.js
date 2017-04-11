const express = require( "express" );
const cookieParser = require( "cookie-parser" );

module.exports = function( config, appConfig ) {

    const app = express();
    const agentUrl = `http://${appConfig.host}:${appConfig.port}/agent`;

    app.set( "view engine", "pug" );
    app.set( "views", __dirname + "/views" );


    app.use( cookieParser() );

    app.get( "/hello-world", ( req, res ) => {

        res.send( "Hello world" );

    } );

    app.get( "/some-links", ( req, res ) => {

        res.render( "some-links", { agentUrl } );

    } );

    app.get( "/some-links/poem", ( req, res ) => {

        res.render( "a-poem", { agentUrl } );

    } );

    app.get( "/a", ( req, res ) => {

        res.render( "alphabet", { "title": "A", "target": "B", "targetUrl": "/a/b" } );

    } );

    app.get( "/a/b", ( req, res ) => {

        res.render( "alphabet", { "title": "B", "target": "C", "targetUrl": "/a/b/c" } );

    } );

    app.get( "/a/b/c", ( req, res ) => {

        res.render( "alphabet", { "title": "C", "target": "A", "targetUrl": "/a" } );

    } );


    app.get( "/sign-in", ( req, res ) => {

        res.render( "sign-in" );

    } );

    app.use( "/secure", function authentication( req, res, next ) {

        if ( !req.cookies.user ) {

            res.redirect( "/sign-in" );

        } else {

            next();

        }

    } );

    app.get( "/secure/home", ( req, res ) => {

        res.render( "secure-home", { "user": req.user } );

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
