const assert = require( "assert" );
const fs = require( "fs-extra" );
const glob = require( "glob" );
const path = require( "path" );

class Diagnostics {

    constructor( world ) {

        this.world = world;
        this.filePath = path.resolve( world.config.headless.diagnostics.filePath );
        this.failureGlob = `${this.filePath}/**/fail_*.json`;
        fs.emptyDirSync( this.filePath );

    }

    findFailureFiles() {

        return new Promise( ( resolve, reject ) => {

            glob( this.failureGlob, ( e, found ) => {

                if ( e ) { reject( e ); } else { resolve( found ); }

            } );

        } );

    }

    findFailureReports() {

        return this.findFailureFiles().then( found =>

            Promise.all( found.map( filePath =>

                new Promise( ( resolve, reject ) =>

                    fs.readJson( filePath, ( e, report ) => {

                        if ( e ) { reject( e ); } else {

                            resolve( [ filePath, report ] );

                        }

                    } )

                )

            ) )

        );

    }

    expectFailureFiles( expected ) {

        return this.findFailureFiles().then( found => {

            const actual = found ? found.length : 0;
            assert.equal( actual, expected, `Expected ${expected} files, but found ${actual}. Found: ${found}` );

        } );

    }

    expectFailureFileContentMatching( expectedPattern ) {

        function verifyContent( filePath, report ) {

            return new Promise( ( resolve, reject ) => {

                const contentFilename = path.resolve( filePath, "..", report.content );
                fs.readFile( contentFilename, "ucs2", ( e, content ) => {

                    if ( e ) { reject( e ); } else {

                        if ( expectedPattern.test( content ) ) {

                            resolve();

                        } else {

                            reject( new Error( `Expected: ${expectedPattern}. Actual: ${content}` ) );

                        }

                    }

                } );

            } );

        }
        expectedPattern = new RegExp( expectedPattern );
        return this.findFailureReports().then( reports => {

            let ret = Promise.resolve();
            while( reports.length ) {

                const [ filePath, report ] = reports.shift();
                ret = ret.then( verifyContent( filePath, report ) );


            }
            return ret;

        } );

    }

    expectFailureFileProps( expectedProperties ) {

        return this.findFailureReports().then( reports => {

            const problems = [];
            reports.forEach( ( [ filePath, report ] ) => {

                expectedProperties.forEach( expected => {

                    const prop = expected.prop;
                    const expectedValue = expected.value;
                    const actualValue = report[ prop ];
                    if ( actualValue != expectedValue ) { // deliberately allow coercion

                        problems.push( `For ${prop} - Expected: ${expectedValue}, Actual: ${actualValue}` );

                    }

                } );

            } );
            if ( problems.length ) {

                throw new Error( problems.join( "\n") );

            }

        } );

    }

}

module.exports = Diagnostics;
