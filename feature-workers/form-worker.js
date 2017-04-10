const assert = require( "assert" );
const shortid = require( "shortid" );

function initDocumentWaiter( waiterId, messageName ) {

    window[ waiterId ] = true;
    window.formicido.bus.once( messageName, function() { delete window[ waiterId ]; } );

}

function completeDocumentWaiter( waiterId, done ) {

    var waitInterval = setInterval( function() {

        if( !window[ waiterId ] ) {

            clearInterval( waitInterval );
            done();

        }

    }, 250 );

}

function waitingForNewURL( client, invokeAction ) {

    return client.getUrl().then( originalUrl =>
        invokeAction().then( () =>
            client.waitUntil( () =>
                client.getUrl().then( maybeNewUrl => maybeNewUrl !== originalUrl ),
                5000
            )
        )
    );

}

function taintPage( taint ) {

    document.body.setAttribute( "data-" + taint, "true" );

}

function taintRemoved( client, taint ) {

    return client.getAttribute( "body", "data-" + taint ).then( found => !found ).catch( e => false );

}
function waitingForPageToReload( client, invokeAction ) {

    const taint = shortid();
    return client.execute( taintPage, taint ).then( () =>
        invokeAction().then( () =>
            client.waitUntil( () => taintRemoved( client, taint ), 5000 )
        )
    );

}
function waitingForMessage( client, eventName, invokeAction ) {

    const waiterId = shortid();
    client.timeoutsAsyncScript( 15000 );
    return client.execute( initDocumentWaiter, waiterId, eventName ).then( () =>
        invokeAction().then( () =>
            client.executeAsync( completeDocumentWaiter, waiterId )
        )
    );

}
class FormWorker{

    constructor( world ) {

        this.world = world;

    }

    clickButtonToMessage( buttonText, eventName ) {

        const { client } = this.world;
        return waitingForMessage( client, eventName, () => client.click( `button=${buttonText}` ) );

    }

    clickButtonToReload( buttonText, expectedMessage ) {

        const { client } = this.world;
        return waitingForPageToReload(client, () => client.click( `button=${buttonText}` ) );

    }

    clickButtonToNewURL( buttonText ) {

        const { client } = this.world;
        return waitingForNewURL( client, () => client.click( `button=${buttonText}` ) );

    }

    clickLinkToNewURL( linkText ) {

        const { client } = this.world;
        return waitingForNewURL( client, () => client.click( `=${linkText}` ) );

    }

    clickSelectorToNewURL( selector ) {

        const { client } = this.world;
        return waitingForNewURL( client, () => client.click( selector ) );

    }

    expectLabelledFieldValue( fieldLabel, expected ) {

        const { client } = this.world;

        return client.element( `label=${fieldLabel}` )
            .getValue( "input, textarea, select" )
            .then( actual => assert.equal( actual, expected ) );

    }

    waitForExpectedContent( selector, expected, timeout ) {

        const { client } = this.world;
        timeout = timeout || 20000;
        return client.waitUntil( () =>

            client.execute( function( selector ) { return document.querySelector( selector ).textContent; }, selector ).then( actual => actual.value === expected ),
            timeout

        );

    }

    expectCheckedLabelledCheckboxes( label, expectedCheckedTable ) {

        const { client } = this.world;
        const expected = expectedCheckedTable.hashes().map( x => x[ "Name" ] );
        const selector = `//label[normalize-space()='${label}']/following-sibling::*[@class='checkbox-list']`;
        return client.execute( function( selector, expected ) {

            var checkboxList = document.evaluate( selector, document.body ).iterateNext();
            if ( !checkboxList ) { throw new Error( "Checkbox list not found for: " + selector ); }
            var found = [];
            [].forEach.call( checkboxList.querySelectorAll( "label" ), function( label ) {

                var labelText = ( label.querySelector( ".checkbox-label" ) || {} ).textContent;
                var checkbox = label.querySelector( "input[type=checkbox]" ) || {};
                if ( checkbox.checked ) { found.push( labelText ); }

            } );
            if ( JSON.stringify( found.sort() ) !== JSON.stringify( expected.sort() ) ) {

                throw new Error( "Expected: " + expected.sort().join( ", " ) + ". Actual: " + found.join( ",  " ) );

            }

        }, selector, expected );
    }

    fill( label, value ) {

        const { client } = this.world;
        return client.element( `label=${label}` ).setValue( "input, textarea", value );

    }

    fillAll( valuesTable ) {

        const fieldValues = valuesTable.hashes();
        let result = Promise.resolve();
        fieldValues.forEach( fieldValue => {

            const { label } = fieldValue;
            const { port } = this.world.config.test;
            if ( "relative-path" in fieldValue ) {

                const relativePath = fieldValue[ "relative-path" ];
                const url = fieldValue.URL || `http://localhost:${port}${relativePath}`;
                result = result.then( () => this.fill( label, url ) );

            } else if ( "value" in fieldValue ) {

                const value = fieldValue[ "value" ];
                result = result.then( () => this.fill( label, value ) );

            } else {

                throw new Error( "Unknown configuration: " + JSON.stringify( fieldValue ) );

            }

        } );
        return result;

    }

    selectLabelledDropdownOptionByText( label, optionText ) {

        const { client } = this.world;
        return client.click( `//*[contains(@class, "label-text") and normalize-space()="${label}"]/parent::label//option[normalize-space()="${optionText}"]` );

    }

    selectLabelledCheckboxes( label, checkboxTable ) {

        const { client } = this.world;
        const checked = checkboxTable.hashes().map( x => x[ "Name" ] );
        const selector = `//label[normalize-space()='${label}']/following-sibling::*[@class='checkbox-list']`;
        return client.execute( function( selector, checked ) {

            var checkboxList = document.evaluate( selector, document.body ).iterateNext();
            if ( !checkboxList ) { throw new Error( "Checkbox list not found for: " + selector ); }
            var found = [];
            [].forEach.call( checkboxList.querySelectorAll( "label" ), function( label ) {

                var labelText = ( label.querySelector( ".checkbox-label" ) || {} ).textContent;
                var checkbox = label.querySelector( "input[type=checkbox]" ) || {};
                checkbox.checked = !!~checked.indexOf( labelText );
                if( checkbox.checked ) { found.push( labelText ); }

            } );
            if ( found.length !== checked.length ) {

                throw new Error( "Some checkboxes were missing, only found: " + found.join( ", " ) );

            }

        }, selector, checked );
    }

}

module.exports = FormWorker;
