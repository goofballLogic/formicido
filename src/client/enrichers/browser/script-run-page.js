export default function( ns ) {

    const { bus } = ns;
    bus.on( "initiate-script", script => bus.emit( "run-script", script ) );

}
