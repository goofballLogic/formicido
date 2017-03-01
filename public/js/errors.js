function displayNotification( e, isError ) {
    
    var infoBlock = document.createElement( "li" );
    infoBlock.className = isError ? "error" : "";
    var timeBlock = document.createElement( "time" );
    timeBlock.innerHTML = new Date().toLocaleDateString();
    var messageBlock = document.createElement( "div" );
    messageBlock.innerHTML = e.detail;
    infoBlock.appendChild( timeBlock );
    infoBlock.appendChild( messageBlock );
    infoBlock.classList.add( "goes" );
    document.querySelector( ".infos" ).appendChild( infoBlock );
    setTimeout( function() {
        
        infoBlock.classList.add( "going" );
        setTimeout( function() { infoBlock.remove(); }, 500 );
        
    }, 5000 );
    
}

function displayErrorNotification( e ) { 
    
    displayNotification( e, true );
    
}

document.addEventListener( "fetch-error", displayErrorNotification );
document.addEventListener( "agent-error", displayErrorNotification );
document.addEventListener( "info-message", displayNotification );
