const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    Given( "well-known steps exist:", function( stepTable ) {

        return this.step.createWellKnownSteps( stepTable );

    } );

    Then( "the outcome should be {stringInDoubleQuotes}", function( expected ) {

        return this.step.expectOutcome( expected );

    } );

    Then( "the outcome should contain {stringInDoubleQuotes}", function( expected ) {

        return this.step.expectOutcomeContains( expected );

    } );

} );