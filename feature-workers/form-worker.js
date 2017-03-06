const shortid = require( "shortid" );

function initDocumentWaiter( waiterId, eventName ) {
    
    window[ waiterId ] = true;
    function waiter() {

        document.dispatchEvent( new CustomEvent( "info-message", { detail: "Path complete event waiter received" } ) );
        document.removeEventListener( eventName, waiter );
        delete window[ waiterId ];
        
        
    }
    document.dispatchEvent( new CustomEvent( "info-message", { detail: "Adding waiter for " + eventName } ) );
    document.addEventListener( eventName, waiter );

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

function waitingForEvent( client, eventName, invokeAction ) {
    
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
    
    clickButtonToEvent( buttonText, eventName ) {
        
        const { client } = this.world;       
        return waitingForEvent( client, eventName, () => client.click( `button=${buttonText}` ) );
        
    }
    
    clickButtonToNewURL( buttonText ) {
        
        const { client } = this.world;
        return waitingForNewURL( client, () => client.click( `button=${buttonText}` ) );

    }

    clickLinkToNewURL( linkText ) {
        
        const { client } = this.world;
        return waitingForNewURL( client, () => client.click( `=${linkText}` ) );

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
    
}

module.exports = FormWorker;
