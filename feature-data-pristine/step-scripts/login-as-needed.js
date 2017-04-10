/*global remote, poll, loginToFakeLoginPage, username, password */

var loginJS = loginToFakeLoginPage
    .replace( "${username}", username ).replace( "${password}", password );

return Promise.resolve().then( function() {

   return remote( loginJS, 200 );

} ).then( function( initialResult ) {

    if ( initialResult.readyState !== "complete" ) {

        return Promise.reject( "Page was not loaded" );

    }
    if ( !initialResult.isFakeLogin ) {

        return Promise.reject( "Not fake login page" );

    }
    // wait for something other than the login page to be loaded
    return poll( 250, 5000, function() {

        return remote( loginJS, 1000 ).then( function( postLoginResult ) {

            // page is loaded
            return ~[ "complete", "interactive" ].indexOf( postLoginResult.readyState )

                // and is something other than the login page
                && !postLoginResult.isFakeLogin;

        } );

    } );

} );
