const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    Given( "CLI options are {stringInDoubleQuotes}", function( defaultCLIargs ) {

        return this.runner.defaultArgsTo( defaultCLIargs );

    } );

    Given( "no repo option is supplied", function() {

        return this.runner.suppressRepoOption();

    } );

    When( "I attempt launch the server it should fail with message {stringInDoubleQuotes}", function( expectedFailMessage ) {

        return this.runner.failToLaunchServerViaCLI( expectedFailMessage );

    } );

    When( "I run the {stringInDoubleQuotes} script from the CLI", function( scriptId ) {

        return this.runner.executeScriptViaCLI( scriptId );

    } );

    When( "I launch the server", function() {

        return this.runner.launchServerViaCLI();

    } );

    Then( "I wait for {stringInDoubleQuotes} to be output to the console {int} times", function( expected, count ) {

        return this.runner.expectOutput( expected, count );

    } );

    Then( "I should be able to download the agent script from {stringInDoubleQuotes} containing the origin {stringInDoubleQuotes}",
        function ( agentURL, expectedOrigin ) {

        return this.runner.expectAgent( agentURL, expectedOrigin );

    } );

    Then( "I should be able to browse to {stringInDoubleQuotes}", function ( expectedURL ) {

        return this.runner.expectURLToResolveSuccessfully( expectedURL );

    } );

} );