/*global reply*/
var fakeLogin = document.querySelector( ".login-container" );
var isFakeLogin = !!(

    fakeLogin
    && fakeLogin.querySelector( "#email" )
    && fakeLogin.querySelector( "#password" )
    && fakeLogin.querySelector( "#submit")

);
var result = {

    isFakeLogin: isFakeLogin,
    readyState: document.readyState

};
reply( null, result );
