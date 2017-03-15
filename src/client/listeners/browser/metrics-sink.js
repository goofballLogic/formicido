export default function( ns ) {
    
    const { bus } = ns;

    // thanks: http://stackoverflow.com/a/18391400/275501
    function replaceErrors(key, value) {
        
        if (value instanceof Error) {
            var error = {};
    
            Object.getOwnPropertyNames(value).forEach(function (key) {
                error[key] = value[key];
            });
            return error;
            
        }
        return value;
        
    }

    const recordMetric = type => detail => {

        detail = JSON.parse( JSON.stringify( detail, replaceErrors ) );
        window.navigator.sendBeacon( "/metrics", JSON.stringify( { type, detail } ) );        

    };
    bus.on( "step-complete", recordMetric( "step" ) );
    bus.on( "path-complete", recordMetric( "path" ) );
    bus.on( "script-complete", recordMetric( "script" ) );
    
}