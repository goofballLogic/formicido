function displayErrorNotification( e ) {
    
    var errBlock = document.createElement( "li" );
    var timeBlock = document.createElement( "time" );
    timeBlock.innerHTML = new Date().toLocaleDateString();
    var messageBlock = document.createElement( "div" );
    messageBlock.innerHTML = e.detail;
    errBlock.appendChild( timeBlock );
    errBlock.appendChild( messageBlock );
    errBlock.classList.add( "goes" );
    document.querySelector( ".errors" ).appendChild( errBlock );
    setTimeout( function() {
        
        errBlock.classList.add( "going" );
        setTimeout( function() { errBlock.remove(); }, 500 );
        
    }, 5000 );
    
}

document.addEventListener( "fetch-error", displayErrorNotification );
document.addEventListener( "agent-error", displayErrorNotification );
