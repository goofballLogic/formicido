/*global reply*/
var username = "${username}";
var password = "${password}";

var fakeLogin = document.querySelector( ".login-container" );
var isFakeLogin = fakeLogin && fakeLogin.querySelector( "#email" )
    && fakeLogin.querySelector( "#password" )
    && fakeLogin.querySelector( "#submit");
var result = {

    isFakeLogin: isFakeLogin,
    readyState: document.readyState

};
if ( result.isFakeLogin ) {

    fakeLogin.querySelector( "#email" ).value = username;
    fakeLogin.querySelector( "#password" ).value = password;
    reply( null, result ); // reply then click to avoid departure race
    fakeLogin.querySelector( "#submit" ).click();

} else {

    reply( null, result );

}
