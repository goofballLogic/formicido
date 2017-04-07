const path = require( "path" );
const fs = require( "fs-extra" );

class Script {

    constructor( world ) {

        this.world = world;

    }

    createWellKnownScript( scriptId ) {

        const { repo } = this.world.config.app;
        try {

            const pristinePath = path.resolve( __dirname, `../feature-data-pristine/script--${scriptId}.json` );
            const fileSystemPath = path.resolve( repo, `./scripts/${scriptId}.json` );
            const script = require( pristinePath );
            const { paths } = script;
            return this.world.path.createWellKnownPaths( paths ).then( () =>

                new Promise( ( resolve, reject ) =>

                    fs.ensureFile( fileSystemPath, ensureError => ensureError ? reject( ensureError )

                        : fs.writeFile( fileSystemPath, JSON.stringify( script, null, 1 ), e => e ? reject( e )

                            : resolve()

                        )

                    )

                )

            );

        } catch( e ) {

            return Promise.reject( e );

        }

    }

}

module.exports = Script;
