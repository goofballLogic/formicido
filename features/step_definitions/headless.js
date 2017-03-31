const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    When( "I invoke a headless run for {scriptId:stringInDoubleQuotes}", function ( scriptId ) {
        
        return this.headless.run( scriptId );
        
    } );
    
    Then( "the headless run should complete without error", function () {
      
        return this.headless.expectSuccessfulRun();
        
    } );
    
    When( "I invoke a continuous headless run for {scriptId:stringInDoubleQuotes}", function ( scriptId ) {
    
        return this.headless.runContinuous( scriptId );
        
    } );
    
    Then( "I wait for the {eventName:stringInDoubleQuotes} event to be emitted {count:int} times", function( eventName, count ) {
        
        return this.headless.waitForEvent( eventName, count );
        
    } );
    
    Then( "I wait for the script collected metric to reach {count:int}", function( count ) {
    
        return this.headless.waitForScriptCollectedMetric( count );
        
    } );
    
} );