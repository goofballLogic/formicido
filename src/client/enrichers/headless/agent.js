export default function( ns ) {

    const { bus, browser } = ns;
    bus.on( "navigate-to", url => {

        return browser.visit( url ).then( () =>

            new Promise( resolve => {

               const poll = () => {

                   if ( browser.document.readyState === "complete" ) { resolve(); }
                   else { setTimeout( poll, 100 ); }

               };
               setTimeout( poll, 100 );

            } )

        ).then(

            () => bus.emit( "navigate-to-complete", {} ),
            err => bus.emit( "navigate-to-complete", { err } )

        );

    } );

    bus.on( "agent-request", x => {

        browser.window.reply = function( err ) {

            process.nextTick( () => {

                bus.emit( "agent-response", { data: {

                    type: "agent-response",
                    cid: x.cid,
                    isSuccess: !err,
                    args: err ? err.stack : [].slice.call( arguments, 1 )

                } } );

            } );

        };
        browser.evaluate( x.js );
        browser.wait();

    } );

}