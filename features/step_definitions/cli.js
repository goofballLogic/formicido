const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "CLI options are {stringInDoubleQuotes}", function( defaultCLIargs ) {

        this.runner.defaultArgsTo( defaultCLIargs );      

    } );

    When( "I run the {stringInDoubleQuotes} script from the CLI", function( scriptId ) {
    
        return this.runner.executeScript( scriptId );
    
    } );
    
    Then( "I wait for {stringInDoubleQuotes} to be output to the console {int} times", function( expected, count ) {

        return this.runner.expectOutput( expected, count );

    } );
    
} );