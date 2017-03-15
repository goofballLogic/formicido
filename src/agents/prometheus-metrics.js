
const { Counter, Gauge } = require( "prom-client" );
const metricCounters = {};

const metrics = require( "../domain/metrics" );

function asNamePart( part ) {
    
    return part.replace( /[^a-zA-Z0-9_:]/g, "_" );
    
}
function asName( parts ) {
    
    
    return "formicido_" + parts.map( x => asNamePart( x ) ).join( "__" );    
    
}

function metricKey( metric ) {
    
    const { type, detail } = metric;
    const { step, path, script } = detail;
    
    switch( type ) {
    
        case "step":
            return asName( [ type, step.stepId, path.pathId, script.scriptId ] );
        case "path":
            return asName( [ type, path.pathId, script.scriptId ] );
        case "script":
            return asName( [ type, script.scriptId ] );
        default:
            return asName( [ "unrecognised", type ] );
        
    }
    
}

function metricDescription( metric ) {

     
    const { type, detail } = metric;
    const { step, path, script } = detail;
    
    switch( type ) {
    
        case "step":
            return `Step ${step.description}, Path ${path.name}, Script ${script.name}`;
        case "path":
            return `Path ${path.name}, Script ${script.name}`;
        case "script":
            return `Script ${script.name}`;
        default:
            return `Metric type is not recognised`;
        
    }
    
}

metrics.on( "metric", metric => {
    
    const key = metricKey( metric );
console.log( key );    
    const description = metricDescription( metric );
    const counter = metricCounters[ key ] = metricCounters[ key ] || new Counter( key, description );
    counter.inc();
    
} );
