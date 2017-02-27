const shortid = require( "shortid" );

function initDocumentWaiter( waiterId, eventName ) {
    
    window[ waiterId ] = true;
    function waiter() {

        document.removeEventListener( eventName, waiter );
        document.querySelector( "textarea" ).innerHTML += "Got it!";
        delete window[ waiterId ];
        
        
    }
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

class FormWorker{
    
    constructor( world ) {
        
        this.world = world;
        
    }
    
    clickButtonToEvent( buttonText, eventName ) {
        
        const { client } = this.world;       
        const waiterId = shortid();
        client.timeoutsAsyncScript( 5000 );
        return client
            .execute( initDocumentWaiter, waiterId, eventName )
            .then( () => client.click( `button=${buttonText}` ) )
            .then( () => client.executeAsync( completeDocumentWaiter, waiterId ) );
        
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
            const relativePath = fieldValue[ "relative-path" ];
            const url = fieldValue.URL || `http://localhost:${port}${relativePath}`;
            result = result.then( () => this.fill( label, url ) );
            
        } );
        return result;
        
    }
    
}

module.exports = FormWorker;
