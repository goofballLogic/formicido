export default function( ns ) {

    const { bus } = ns;
    bus.on( "metrics", metrics => {

        window.navigator.sendBeacon( "/metrics", metrics );

    } );

}