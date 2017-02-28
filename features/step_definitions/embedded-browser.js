const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    When( "I navigate the embedded browser to {url:stringInDoubleQuotes}", function( url ) {
        
        return this.embeddedBrowser.navigateTo( url );
        
    } );
    
    Then( "the frame's location should be {expected:stringInDoubleQuotes}", function ( expected ) {
        
        return this.embeddedBrowser.expectLocation( expected );
        
    } );
    
    Then( "the frame's text should contain {expected:stringInDoubleQuotes}", function ( expected ) {
        
        return this.embeddedBrowser.expectContent( expected );
        
    } );
    
} );
