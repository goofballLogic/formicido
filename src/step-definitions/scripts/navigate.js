/* global navigateTo, poll, remote, url */

var fetchLocationScript = "reply( null, { location: document.location.toString(), readyState: document.state } );";
return navigateTo( url, 10000 ).then( function() {

    return poll( 250, 5000, function() {

        // get new location
        return remote( fetchLocationScript, 1000 ).then( function( state ) {

            return !~[ "complete", "interactive" ].indexOf( state.readyState );

        } );

    } ).then( function() {

        // get new location
        return remote( fetchLocationScript, 1000 ).then( function( state ) {

            return state.location === url
                ? Promise.resolve()
                : Promise.reject( new Error( "Unexpected URL after navigation. Expected: '" + url + "'. Actual: '" + state.location + "'" ) );

        } );

    } );

} );
