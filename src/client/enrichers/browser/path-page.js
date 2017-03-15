export default function( ns ) {
    
    const { bus } = ns;
    window.addEventListener( "DOMContentLoaded", () => {
        
        if ( !document.body.classList.contains( "path-page" ) ) { return; }
        bus.on( "fetch-result", detail => bus.emit( "run-path", detail ) );

    } );
    
}
