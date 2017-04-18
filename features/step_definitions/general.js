const { defineSupportCode} = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    Given( "I have opened formicido", function () {

        const { app } = this.config;
        const url = `http://${app.host}:${app.port}/`;
        return this.client.url( url ).waitUntil(

            () => this.client.getUrl().then( actualUrl => actualUrl === url )

        );

    } );

    When( "I follow the {stringInDoubleQuotes} link", function ( linkText ) {

       return this.client.element( `//a[contains(string(.), '${linkText}')]` ).click();

    } );

    When( "I enter form values", function( valueTable ) {

        return this.formWorker.fillAll( valueTable );

    } );

    When( "I click the {stringInDoubleQuotes} button and wait for the {stringInDoubleQuotes} message", function ( buttonText, messageName ) {

        return this.formWorker.clickButtonToMessage( buttonText, messageName );

    } );

    When( "I click the {stringInDoubleQuotes} button and wait for the form to submit", function( buttonText ) {

        return this.formWorker.clickButtonToSubmit( buttonText );

    } );

    When( "I click the {stringInDoubleQuotes} button and wait for( the) URL to change", function ( buttonText ) {

       return this.formWorker.clickButtonToNewURL( buttonText );

    } );

    When( "I click the {stringInDoubleQuotes} link and wait for the URL to change", function ( linkText ) {

       return this.formWorker.clickLinkToNewURL( linkText );

    } );

    When( "I select {stringInDoubleQuotes} from the {stringInDoubleQuotes} dropdown", function( optionText, labelText ) {

        return this.formWorker.selectLabelledDropdownOptionByText( labelText, optionText );

    } );

    When( "I click the {stringInDoubleQuotes} button and wait for the page to reload", function( buttonText ) {

        return this.formWorker.clickButtonToReload( buttonText );

    } );

    Then( "the {stringInDoubleQuotes} field value should be {stringInDoubleQuotes}", function( fieldLabel, expectedValue ) {

        return this.formWorker.expectLabelledFieldValue( fieldLabel, expectedValue );

    } );

    When( "I select checkboxes for {stringInDoubleQuotes}", function( fieldLabel, checkboxNameTable ) {

        return this.formWorker.selectLabelledCheckboxes( fieldLabel, checkboxNameTable );

    } );

    Then( "the checked checkboxes for {stringInDoubleQuotes} should be", function( fieldLabel, checkboxNameTable ) {

        return this.formWorker.expectCheckedLabelledCheckboxes( fieldLabel, checkboxNameTable );

    } );

    When( "I wait for {stringInDoubleQuotes} to equal {stringInDoubleQuotes}", {timeout: 30 * 1000}, function( selector, expected ) {

        return this.formWorker.waitForExpectedContent( selector, expected );

    } );

} );
