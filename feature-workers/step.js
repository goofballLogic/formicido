const assert = require( "assert" );
const fs = require( "fs-extra" );
const path = require( "path" );

class Step{

    constructor( world ) { this.world = world; }

    copyWellKnownScriptsFolder() {

        const { repo } = this.world.config.app;
        const fileStoreScripts = path.resolve( repo, "./steps/scripts" );
        const pristineScripts = path.resolve( __dirname, "../feature-data-pristine/step-scripts" );
        return new Promise( ( resolve, reject ) =>

            fs.copy( pristineScripts, fileStoreScripts, ( e ) => e ? reject( e ) : resolve() )

        );

    }

    createWellKnownStep( stepId ) {

        const { repo } = this.world.config.app;
        const fileStoreStep = path.resolve( repo, `./steps/${stepId}.js` );
        const pristineStep = path.resolve( __dirname, `../feature-data-pristine/step--${stepId}.js` );
        return new Promise( ( resolve, reject ) =>

            fs.readFile( pristineStep, ( readError, data ) => readError ? reject( readError )

                : fs.ensureFile( fileStoreStep, ensureError => ensureError ? reject( ensureError )

                    : fs.writeFile( fileStoreStep, data, writeError => writeError ? reject( writeError )

                        : resolve()

                    )

                )

            )

        );

    }

    createWellKnownSteps( steps ) {

        if ( steps.hashes ) {

            steps = steps.hashes().map( x => x.step );

        }
        return Promise.all(

            steps
                .map( x => this.createWellKnownStep( x ) )
                .concat( this.copyWellKnownScriptsFolder() )

        );

    }

    expectOutcome( expected ) {

        const { client } = this.world;
        return client.getText( ".step-outcome" ).then( actual => assert.equal( actual, expected ) );

    }

    expectOutcomeContains( expected ) {

        const { client } = this.world;
        return client.getText( ".step-outcome" ).then( actual => assert( !!~actual.indexOf( expected ), `${expected} not found in ${actual}` ) );

    }

}
module.exports = Step;
