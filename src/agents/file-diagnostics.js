const path = require( "path" );
const fs = require( "fs-extra" );

class FileDiagnostics {

    constructor( bus ) {

        bus.on( "diagnostic-report", x => this.handleReport( x ) );

    }

    configure( options ) {

        this.filePath = options.diagnostics.filePath;
        if ( !this.filePath ) {

            throw new Error( "diagnostics.filePath must be specified" );

        }
        this.options = options;

    }

    handleReport( report ) {

        try {

            const { content, detail, location, now } = report;
            let { scriptId, pathId, step } = report;
            scriptId = scriptId || "unknown";
            pathId = pathId || "unknown";
            step = step || "-1";
            const day = new Date().toISOString().substr( 0, 10 );
            const folderPath = path.resolve( this.filePath, day, scriptId, pathId );
            const name = `fail_step-${step}_${now}`;
            return Promise.all( [

                this.outputFailureFile( folderPath, name, report ),
                this.outputFailureContent( folderPath, name, report )

            ] );

        } catch( ex ) {

            console.error( ex );

        }

    }

    outputFailureFile( folderPath, name, report ) {

        return new Promise( ( resolve, reject ) => {

            const filePath = path.resolve( folderPath, `${name}.json` );
            const output = Object.assign( {}, report );
            output.content = `${name}.html`;
            fs.outputJson( filePath, output, e => {

                if ( e ) { reject( e ); } else { resolve(); }

            } );

        } );

    }

    outputFailureContent( folderPath, name, report ) {

        return new Promise( ( resolve, reject ) => {

            const filePath = path.resolve( folderPath, `${name}.html` );
            const output = report.content;
            fs.outputFile( filePath, output, e => {

                if ( e ) { reject( e ); } else { resolve(); }

            } );

        } );

    }

}

module.exports = FileDiagnostics;
