const metrics = require( "../domain/metrics" );
metrics.on( "metric", data => {

    console.log( `${data.type} metric received` );

} );

