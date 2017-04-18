/*global remote, poll, loginToFakeLoginPage, detectFakeLoginPage, username, password */

var loginJS = loginToFakeLoginPage.replace( "${username}", username ).replace( "${password}", password );

return Promise.resolve().then( function() {

   return remote( loginJS, 2000 );

} ).then( function( initialResult ) {

    if ( initialResult.readyState !== "complete" ) {

        return Promise.reject( "Page was not loaded" );

    }
    if ( !initialResult.isFakeLogin ) {

        return Promise.reject( "Not fake login page" );

    }

    // wait for something other than the login page to be loaded
    return poll( 250, 5000, function() {

        return remote( detectFakeLoginPage, 1000 ).then( function( maybeFinalResult ) {

            // page is loaded
            return ~[ "complete", "interactive" ].indexOf( maybeFinalResult.readyState )

                // and is something other than the login page
                && !maybeFinalResult.isFakeLogin;

        } );

    } );

} );
