import promiseTimeout from "../promise-timeout";

export default function runner( ns ) {

    const { bus, uuid, debug } = ns;

    function buildRemoteListener( cid, resolve, reject ) {

        return received => {

            if ( !( received && received.data && received.data.cid === cid ) ) { return; }
            debug( "Reply to: " + cid );
            const data = received.data;
            const args = [].concat( data.args || [] );
            const output = args.length === 1 ? args[ 0 ] : args;
            if ( data.isSuccess ) {

                resolve( output );

            } else {

                reject( output );

            }

        };

    }

    function remote( js, timeout ) {

        const cid = uuid();
        let listener;
        return promiseTimeout( timeout || 5000, ( resolve, reject ) => {

            listener = buildRemoteListener( cid, resolve, reject );

            bus.on( "agent-response", listener );
            debug( "Remoting: " + cid );
            bus.emit( "agent-request", { cid, js } );

        }, () => {

            bus.removeListener( "agent-response", listener );

        } );

    }

    function buildPollTask( testScript, interval, resolve, timeoutTest ) {

        const pollTask = () => testScript()
            .catch( err => { console.log( err ); return false; } )
            .then( result => {

                if ( result ) {

                    resolve();

                } else {

                    if ( !timeoutTest() ) {

                        debug( "Scheduling another poll" );
                        setTimeout( pollTask, interval );

                    }

                }

            } );
        return pollTask;

    }

    function poll( interval, timeout, testScript ) {

        var isTimedOut = false;
        return promiseTimeout( timeout, ( resolve, reject ) => {

            const pollTask = buildPollTask( testScript, interval, resolve, () => isTimedOut );
            pollTask();

        }, () => {

            isTimedOut = true;

        } );

    }

    function navigateTo( url ) {

        return new Promise( ( resolve, reject ) => {

            bus.once( "navigate-to-complete", detail => detail.err ? reject( detail.err ) : resolve() );
            bus.emit( "navigate-to", url );

        } );

    }

    bus.on( "run-step", function executeStep( detail ) {

        const { id, description, script, args } = detail;
        let context = detail.context || {};
        const stepId = id;

        var dynamicArgs = Object.keys( args || {} );
        var func = Function.apply( null, [ "navigateTo", "remote", "poll" ].concat( dynamicArgs ).concat( script ) );
        var dynamicArgValues = dynamicArgs.map( x => args[ x ] );
        context.step = { stepId, description, args, start: Date.now() };
        promiseTimeout( 10000, ( resolve, reject ) => {

            func.apply( null, [ navigateTo, remote, poll ].concat( dynamicArgValues ) )
                .then( resolve, reject );

        }, maybeErr => {

            context.step.end = Date.now();
            context.step.err = maybeErr;
            bus.emit( "step-complete", context );

        } );

    } );

}
