export default function( ns ) {
    
    const { bus } = ns;
    const recordMetric = metricType => detail => {

        detail = JSON.parse( JSON.stringify( detail ) );
        if ( detail.err ) { detail.err = detail.err.stack; }
        var metric = { type: metricType, detail: detail };
        window.navigator.sendBeacon( "/metrics", JSON.stringify( metric ) );        

    };
    bus.on( "step-complete", recordMetric( "step" ) );
    bus.on( "path-complete", recordMetric( "path" ) );
    bus.on( "script-complete", recordMetric( "script" ) );
    
}