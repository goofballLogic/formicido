/*global CustomEvent*/

function ajaxSubmit( form ) {
    
    var doc = {};
    [].slice.call( form.elements, 0 ).forEach( function( variable ) {

        var varName = variable.name;
        if ( varName ) {
            
            var values = doc[ varName ] = doc[ varName ] || [];
            values.push( variable.value );
            
         }
        
    } );
    var url = form.action || window.location.toString();
    var options = { 
        method: "POST", 
        body: JSON.stringify( doc ),
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
        
    };
    window.fetch( url, options )
        .then( response => {

            if ( response.ok) { 

                var redirectedToHTML = !!~response.headers.get( "content-type" ).indexOf( "text/html" );
                if ( redirectedToHTML ) {
    
                    location.href = response.url;
                    
                } else {
                    
                    return response.json().then( json => document.dispatchEvent( new CustomEvent( "fetch-result", { detail: json } ) ) );

                }
            
            } else {
            
                return response.text().then( text => {
               
                   throw new Error( "Fetch failed with " + response.status + ": " + text ); 
               
                }, e => {
                
                    throw new Error( "Fetch failed with " + response.status + ": " + e.message );
                
                } );

            }

        } )
        .catch( e => {
          
            document.dispatchEvent( new CustomEvent( "fetch-error", { detail: e.message } ) );
            
        } );
    
}

document.addEventListener( "submit", function( e ) {

    if ( e.target.classList.contains( "via-ajax" ) ) {
    
        e.preventDefault();    
        ajaxSubmit( e.target );
        
    } else {
        
        return true;
        
    }
    
} );

document.addEventListener( "ajax-submit", function( e ) {
    
    ajaxSubmit( e.detail );
    
} );