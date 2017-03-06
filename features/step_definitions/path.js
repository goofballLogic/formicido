const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Then( "all steps should have succeeded", function() {
    
        return this.path.expectPathStepsSuccess();
        
    } );
    
} );