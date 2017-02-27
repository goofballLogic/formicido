const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {
    
    Given( "I have opened formicido", function () {
    
        const { app } = this.config;
        return this.client.url( `http://${app.host}:${app.port}/` ).getTitle().then( title => {
            
            console.log( title );
            
        } );
        
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
    
} );