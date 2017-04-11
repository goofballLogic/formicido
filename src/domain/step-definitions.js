const fs = require( "fs-extra" );
const path = require( "path" );
const config = require( "../../config" );

let activeRepo = null;
let stepDefinitions = null;

function stepFilesFrom( root ) {

    return fs.readdirSync( root )
        .filter( x => /\.js$/.test( x ) )
        .filter( x => x !== "step-base.js" )
        .map( x => path.resolve( root, x ) );

}

function findStepFiles() {

    const librarySteps = stepFilesFrom( __dirname + "/../step-definitions" );
    const { repo } = config;
    activeRepo = repo;

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

    const { repo } = config;
    if ( repo !== activeRepo ) {

        stepDefinitions = null;

    }
    if ( !stepDefinitions ) {

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
