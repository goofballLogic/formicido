const fs = require( "fs-extra" );
const path = require( "path" );

let stepDefinitions = [];

function stepFilesFrom( root ) {

    return fs.readdirSync( root )
        .filter( x => /\.js$/.test( x ) )
        .filter( x => x !== "step-base.js" )
        .map( x => path.resolve( root, x ) );

}

function findStepFiles() {

    const librarySteps = stepFilesFrom( __dirname + "/../step-definitions" );
    const { repo } = require( "../../config" );
    try {

        const userSteps = stepFilesFrom( path.resolve( repo, "./steps" ) );
        return librarySteps.concat( userSteps );

    } catch( ex ) {

        if ( ex.code === "ENOENT" ) {

            return librarySteps;

        } else {

            throw ex;

        }

    }

}

function ensureStepDefinitions() {

    if ( stepDefinitions.length === 0 ) {

        stepDefinitions = findStepFiles()
            .map( stepPath => require( stepPath ) )
            .map( stepClass => ( {

                "description": stepClass.stepDescription || "No description provided",
                "name": stepClass.stepName,
                "slug": ( stepClass.stepName || "" ).toLowerCase().replace( /\W/g, "-" ),
                "class": stepClass

            } ) )
            .reduce( ( acc, x ) => Object.assign( acc, { [ x.slug ]: x } ), {} );

    }

}

module.exports = function() {

    ensureStepDefinitions();
    return stepDefinitions;

};
