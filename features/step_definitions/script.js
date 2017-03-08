const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "well-known script {scriptName:stringInDoubleQuotes} exists", function( scriptName ) {

        return this.script.createWellKnownScript( scriptName );

    } );
    
} );
