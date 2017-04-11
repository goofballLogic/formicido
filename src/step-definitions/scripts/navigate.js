/* global navigateTo, remote, url */

var fetchLocationScript = "reply( null, { location: document.location.toString() } );";
return navigateTo( url, 10000 ).then( function() {

    return remote( fetchLocationScript, 1000 ).then( function( found ) {

        return found.location === url
            ? Promise.resolve()
            : Promise.reject( new Error( "Unexpected URL after navigation. Expected: " + url + ". Actual: " + found.location ) );

    } );

} );