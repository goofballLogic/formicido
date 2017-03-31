export default function( ns ) {
    
    const { bus } = ns;
    bus.on( "error-message", message => console.error( message ) );
    
}
