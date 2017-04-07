export default function( ns ) {

    const { bus } = ns;

    window.addEventListener( "DOMContentLoaded", () => {

        if( !document.body.classList.contains( "step-page" ) ) { return; }
        ns.options.debug = true;

        bus.on( "fetch-result", detail => {

            document.querySelector( "#code" ).innerHTML = detail.script;
            bus.emit( "run-step", detail );

        } );

    } );

}
