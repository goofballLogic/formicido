const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Then( "the outcome should be {expected:stringInDoubleQuotes}", function( expected ) {
    
        return this.step.expectOutcome( expected );
        
    } );
    
} );