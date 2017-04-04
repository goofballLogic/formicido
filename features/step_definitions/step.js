const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Then( "the outcome should be {stringInDoubleQuotes}", function( expected ) {
    
        return this.step.expectOutcome( expected );
        
    } );
    
    Then( "the outcome should contain {stringInDoubleQuotes}", function( expected ) {
        
        return this.step.expectOutcomeContains( expected );
        
    } );
    
} );