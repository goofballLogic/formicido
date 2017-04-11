const assert = require( "assert" );
const path = require( "path" );
const fs = require( "fs-extra" );

class Path {

    constructor( world ) { this.world = world; }

    clickStepLinkToURL( linkLabel, stepNumber ) {

        return this.world.formWorker.clickSelectorToNewURL( `//*[@class="steps"]/li[${stepNumber}]//a[normalize-space()="${linkLabel}"]` );

    }

    clickPathLinkTo( pathName ) {

        const selector = `//span[@class='path-name' and normalize-space()=\"${pathName}\"]/parent::a`;
        return this.world.formWorker.clickSelectorToNewURL( selector );

    }

    createWellKnownPath( pathId ) {

        const { repo } = this.world.config.app;
        const fileStorePath = path.resolve( repo, `./paths/${pathId}.json` );
        const pristinePath = path.resolve( __dirname, `../feature-data-pristine/path--${pathId}.json` );
        return new Promise( ( resolve, reject ) =>

            fs.readFile( pristinePath, ( readError, data ) => readError ? reject( readError )

                : fs.ensureFile( fileStorePath, ensureError => ensureError ? reject( ensureError )

                    : fs.writeFile( fileStorePath, data, writeError => writeError ? reject( writeError )

                        : resolve()

                    )

                )

            )

        );

    }

    createWellKnownPaths( paths ) {

        if ( paths.hashes ) {

            paths = paths.hashes().map( x => x.path );

        }
        return Promise.all( paths.map( x => this.createWellKnownPath( x ) ) );

    }

    expectCompensationPaths( expectedPathNames ) {

        const { client } = this.world;
        return client.execute( function() {

            var results = [];
            var list = document.querySelectorAll( ".unhappy-paths > li" );
            for( var i = 0; i < list.length; i++ ) {

                results.push( list[ i ].textContent );

            }
            return results;

        } ).then( results => {

           assert.deepEqual( expectedPathNames.sort(), results.value.sort() );

        } );

    }

    expectStepCount( expected ) {

        const { client } = this.world;
        return client.elements( ".steps > li" ).then( found => assert.equal( found.value.length, expected ) );

    }

    expectPathStepsSuccess() {

        const { client } = this.world;
        client.execute( function() {

            var results = [];
            var list = document.querySelectorAll( "#transcript li" );
            for( var i = 0; i < list.length; i++ ) {

                var li = list[ i ];
                results.push( {

                    className: li.className,
                    text: li.textContent,
                    index: results.length

                } );

            }
            return results;

        } ).then( results => {

            var failed = results.value
                .filter( x => !x.className.test( /step-success/ ) )
                .map( x => `Step ${x.index}: ${x.text}` )
                .join( ",\n" );
            if ( failed.length ) {

                throw new Error( failed );

            }

        } );

    }

}
module.exports = Path;
