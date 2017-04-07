export default function ajaxFormSubmit( ns ) {

    const { bus } = ns;

    function ajaxSubmit( form ) {

        const doc = {};
        [].slice.call( form.elements, 0 ).forEach( field => {

            const name = field.name;
            if ( name ) {

                const values = doc[ name ] = doc[ name ] || [];
                values.push( field.value );

             }

        } );
        const url = form.action || window.location.toString();
        const options = {

            method: "POST",
            body: JSON.stringify( doc ),
            headers: { "Accept": "application/json", "Content-Type": "application/json" }

        };
        window.fetch( url, options ).then( response => {

            if ( response.ok) {

                var redirectedToHTML = !!~response.headers.get( "content-type" ).indexOf( "text/html" );
                if ( redirectedToHTML ) {

                    window.location.href = response.url;

                } else {

                    return response.json().then( json => bus.emit( "fetch-result", json ) );

                }

            } else {

                return response.text().then( text => {

                   throw new Error( "Fetch failed with " + response.status + ": " + text );

                }, e => {

                    throw new Error( "Fetch failed with " + response.status + ": " + e.message );

                } );

            }

        } )
        .catch( e => bus.emit( "error-message", e.message ) );

    }

    document.addEventListener( "submit", e => {

        if ( !e.target.classList.contains( "via-ajax" ) ) { return; }
        e.preventDefault();
        ajaxSubmit( e.target );


    } );

}
