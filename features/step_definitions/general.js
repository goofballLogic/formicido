const { defineSupportCode} = require( "cucumber" );
const { app } = require( "../config.js" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "I have opened formicado", function () {
    
        return this.client.url( `http://localhost:${app.port}` );
        
    } );
    
} );