/*global reply*/
var username = "${username}";
var password = "${password}";

try {

    var idToken1 = document.querySelector( "#idToken1" );
    var idToken2 = document.querySelector( "#idToken2" );
    if ( !( idToken1 && idToken2 ) ) {

        throw new Error( "Expected username and password inputs with ids of 'idToken1' and 'idToken2' resepectively. Instead, found: " + document.body.innerHTML );

    }
    var loginButton = document.querySelector( "#loginButton_0" );
    if ( !loginButton ) {

        throw new Error( "Expected to find a log in button with id 'loginButton_0'. Instead, found: " + document.body.innerHTML );

    }
    idToken1.value = username;
    idToken2.value = password;
    loginButton.click();

} catch( e ) {

    reply( e );

}