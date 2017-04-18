/*global reply, window*/
reply( null, {

    isLogin: !!~window.location.href.indexOf( "openam/XUI/#login" ),
    readyState: document.readyState

} );
