const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    When( "I navigate the embedded browser to {stringInDoubleQuotes}", function( url ) {

        return this.embeddedBrowser.navigateTo( url );

    } );

    Then( "the frame's location should be {stringInDoubleQuotes}", function ( expected ) {

        return this.embeddedBrowser.expectLocation( expected );

    } );

    Then( "the frame's text should contain {stringInDoubleQuotes}", function ( expected ) {

        return this.embeddedBrowser.expectContent( expected );

    } );

} );
