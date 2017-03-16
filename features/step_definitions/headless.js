const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    When( "I invoke a headless run for {scriptId:stringInDoubleQuotes}", function ( scriptId ) {
        
        return this.headless.run( scriptId );
        
    } );
    
    Then( "the headless run should complete without error", function () {
      
        return this.headless.expectSuccessfulRun();
        
    } );
    
} );