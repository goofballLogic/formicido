const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Then( "all steps should have succeeded", function() {
    
        return this.path.expectPathStepsSuccess();
        
    } );
    
    When( "I click the {linkLabel:stringInDoubleQuotes} link for step {stepNumber:int} and wait for the URL to change", function( linkLabel, stepNumber ) {
    
        return this.path.clickStepLinkToURL( linkLabel, stepNumber );
        
    } );
    
    Then( "there should be {stepCount:int} steps shown", function( stepCount ) {
    
        return this.path.expectStepCount( stepCount );
        
    } );
    
} );