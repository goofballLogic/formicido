export default function( ns ) {

    const { bus, error } = ns;
    bus.on( "agent-request", detail => {

        var frame = document.querySelector( "#embedded-browser" );
        if ( !frame ) { error( "No embedded browser found" ); }
        frame.contentWindow.postMessage( detail, "*" );

    } );

}