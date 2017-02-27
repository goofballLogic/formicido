const fs = require( "fs" );
const stepDefRoot = __dirname + "/../step-definitions";
const stepDefinitions = fs.readdirSync( stepDefRoot ).map( x => ( {

    "name": require( `${stepDefRoot}/${x}` ).stepName,
    "class": require( `${stepDefRoot}/${x}` )

} ) ).reduce( ( acc, x ) => Object.assign( acc, { [ x.name ]: x.class } ), {} );

console.log( stepDefinitions );

module.exports = stepDefinitions;
