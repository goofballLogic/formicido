const fs = require( "fs" );
const stepDefRoot = __dirname + "/../step-definitions";
const stepDefinitions = fs.readdirSync( stepDefRoot )
    .filter( x => /\.js$/.test( x ) )
    .filter( x => x !== "step-base.js" )
    .map( x => require( `${stepDefRoot}/${x}` ) )
    .map( x => ( {

        "name": x.stepName,
        "slug": x.stepName.toLowerCase().replace( /\W/g, "-" ),
        "class": x

    } ) )
    .reduce( ( acc, x ) => Object.assign( acc, { [ x.slug ]: x } ), {} );

module.exports = stepDefinitions;
