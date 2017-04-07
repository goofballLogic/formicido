function displayNotification( message, isError ) {

    const infoBlock = document.createElement( "li" );
    const timeBlock = document.createElement( "time" );
    const messageBlock = document.createElement( "div" );

    messageBlock.innerHTML = message;
    timeBlock.innerHTML = new Date().toLocaleDateString();
    infoBlock.className = isError ? "error" : "";
    infoBlock.appendChild( timeBlock );
    infoBlock.appendChild( messageBlock );
    infoBlock.classList.add( "goes" );
    document.querySelector( ".infos" ).appendChild( infoBlock );
    setTimeout( () => {

        infoBlock.classList.add( "going" );
        setTimeout( () => infoBlock.remove(), 500 );

    }, 5000 );

}

function displayErrorNotification( message ) {

    displayNotification( message.stack || message, true );

}

export default function( ns ) {

    const { bus } = ns;
    bus.on( "error-message", displayErrorNotification );
    bus.on( "info-message", displayNotification );
    bus.on( "debug-message", displayNotification );

}

