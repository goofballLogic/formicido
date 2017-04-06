const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "CLI options are {stringInDoubleQuotes}", function( defaultCLIargs ) {

        this.runner.defaultArgsTo( defaultCLIargs );      

    } );

    Given( "the CLI repo option is set to a well-known location", function () {
    
        this.runner.addDefaultRepoArg();
        
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