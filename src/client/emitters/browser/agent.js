export default function( ns ) {

    const { bus } = ns;

    window.addEventListener( "message", e => {

        if ( !( e.data && e.data.args && e.data.type === "agent-response" ) ) { return; }
        var received = { origin: e.origin, data: e.data };
        bus.emit( "agent-response", received );

    } );

}
