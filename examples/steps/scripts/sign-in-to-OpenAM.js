/*global remote, poll, detectLogin, signIn, username, password */

var signInWithCredentials = signIn.replace( "${username}", username ).replace( "${password}", password );

return Promise.resolve().then( function() {

    // ensure we are on the login page
    return poll( 250, 5000, function() {

        return remote( detectLogin, 250 ).then( function( result ) {

            if ( !~[ "complete", "interactive" ].indexOf( result.readyState ) ) { return false; }
            return result.isLogin;

        } );

    } );

} ).then( function() {

    // sign in with the supplied credentials
    return remote( signInWithCredentials, 10000 );

} ).then( function() {

    // wait until we leave the login page
    return poll( 250, 5000, function() {

        return remote( detectLogin, 250 ).then( function( result ) {

            if ( !~[ "complete", "interactive" ].indexOf( result.readyState ) ) { return false; }
            return !result.isLogin;

        } );

    } );

} );
