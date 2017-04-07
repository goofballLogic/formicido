
const { Counter, Gauge } = require( "prom-client" );

const metricWasCollectedCounter = {};
const metricFaultsCounter = {};

const metrics = require( "../domain/metrics" );

function asNamePart( part ) {

    return ( part || "" ).replace( /[^a-zA-Z0-9_:]/g, "_" );

}
function asName( parts ) {


    return "formicido_" + parts.map( x => asNamePart( x ) ).join( "__" );

}

function metricKey( metric ) {

    const { type, detail } = metric;
    let { step, path, script } = detail;
    step = step || {};
    path = path || {};
    script = script || {};

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
    let { step, path, script } = detail;
    step = step || {};
    path = path || {};
    script = script || {};

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

function metricErr( metric ) {

    let { step, path, script } = metric.detail;
    step = step || {};
    path = path || {};
    script = script || {};
    return script.err || path.err || step.err;

}

function metricWasCollected( metric, key, description ) {

    const counter = metricWasCollectedCounter[ key ] = metricWasCollectedCounter[ key ]
        || new Counter( key + "__collected", "Metric was collected: " + description );
    counter.inc();

}

function metricFaults( metric, key, description ) {

    if ( !metricErr( metric ) ) { return; }
    const counter = metricFaultsCounter[ key ] = metricFaultsCounter[ key ]
        || new Counter( key + "__fault", "Fault: " + description );
    counter.inc();

}

metrics.on( "metric", metric => {

    const key = metricKey( metric );
    const description = metricDescription( metric );

    metricWasCollected( metric, key, description );
    metricFaults( metric, key, description );

} );
