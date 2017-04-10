const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    Then( "all steps should have succeeded", function() {

        return this.path.expectPathStepsSuccess();

    } );

    When( "I click the {stringInDoubleQuotes} link for step {int} and wait for the URL to change", function( linkLabel, stepNumber ) {

        return this.path.clickStepLinkToURL( linkLabel, stepNumber );

    } );

    Then( "there should be {int} steps shown", function( stepCount ) {

        return this.path.expectStepCount( stepCount );

    } );

    Given ( "well-known test paths exist:", function( pathTable ) {

        return this.path.createWellKnownPaths( pathTable );

    } );

    Given('I navigate to the {stringInDoubleQuotes} path', function( pathName ) {

        return this.path.clickPathLinkTo( pathName );

    } );

    Then( "the path's compensation paths should include {stringInDoubleQuotes}", function( pathName ) {

        return this.path.expectCompensationPaths( [ pathName ] );

    } );

} );