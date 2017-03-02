const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "I have opened formicido", function () {
    
        const { app } = this.config;
        const url = `http://${app.host}:${app.port}/`;
        return this.client.url( url ).waitUntil( 
            
            () => this.client.getUrl().then( actualUrl => actualUrl === url ) 
        
        );
        
    } );
    
    When( "I follow the {arg1:stringInDoubleQuotes} link", function ( linkText ) {
       
       return this.client.element( `=${linkText}` ).click();
       
    } );
    
    When( "I enter form values", function( valueTable ) {

        return this.formWorker.fillAll( valueTable );
        
    } );
    
    When( "I click the {buttonText:stringInDoubleQuotes} button and wait for the {eventName:stringInDoubleQuotes} event", function ( buttonText, eventName ) {
         
        return this.formWorker.clickButtonToEvent( buttonText, eventName );
    
    } );
    
    When( "I click the {buttonText:stringInDoubleQuotes} button and wait for( the) URL to change", function ( buttonText ) {
    
       return this.formWorker.clickButtonToNewURL( buttonText );
    
    } );

    When( "I click the {linkText:stringInDoubleQuotes} link and wait for URL to change", function ( linkText ) {
    
       return this.formWorker.clickLinkToNewURL( linkText );
    
    } );
    
    When( "I select {optionText:stringInDoubleQuotes} from the {labelText:stringInDoubleQuotes} dropdown", function( optionText, labelText ) {

        return this.formWorker.selectLabelledDropdownOptionByText( labelText, optionText );

    } );
    
} );