export default function promiseTimeout( timeout, promise, callback ) {

    const constructionStack = new Error().stack;
    return new Promise( ( resolve, reject ) => {

        let isActive = true;
        function deactivate( err ) {

            if ( !isActive ) { return false; }
            isActive = false;
            callback( err );
            return true;

        }

        setTimeout( () => {

            const timedOut = new Error( "Timed out. " + constructionStack );
            if ( deactivate( timedOut ) ) {

                reject( timedOut );

            }

        }, timeout );
        promise( function() {

            if ( deactivate() ) {

                resolve.apply( null, arguments );

            }

        }, function( err ) {

            if ( deactivate( err ) ) {

                reject.apply( null, arguments );

            }

        } );

    } );

}