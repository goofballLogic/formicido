/*global CustomEvent*/

document.addEventListener( "submit", function( e ) {
    
    if ( e.target.classList.contains( "variables" ) ) {
        
        e.preventDefault();
        var doc = {};
        [].slice.call( e.target.elements, 0 ).forEach( function( variable ) {
            
            var varName = variable.name;
            if ( varName ) {
                
                var values = doc[ varName ] = doc[ varName ] || [];
                values.push( variable.value );
                
             }
            
        } );
        var url = e.target.action || window.location.toString();
        window.fetch( url, { method: "POST", body: JSON.stringify( doc ), headers: { "Content-Type": "application/json" } } )
            .then( response => {
                
                if ( response.ok) { 
                    
                    return response.json();
                    
                } else {
                    
                    return response.text().then( text => {
                       
                       throw new Error( "Fetch failed with " + response.status + ": " + text ); 
                       
                    }, e => {
                        
                        throw new Error( "Fetch failed with " + response.status + ": " + e.message );
                        
                    } );

                }

            } )
            .then( json => {
                
                document.querySelector( "#code" ).innerHTML = json.script;
                document.dispatchEvent( new CustomEvent( "run-script", { detail: json } ) );

            } )
            .catch( e => {
              
                document.dispatchEvent( new CustomEvent( "fetch-error", { detail: e.message } ) );
                
            } );

    } else {
        
        return true;
        
    }
    
} );
