const config = require( "../config" );

const fs = require( "fs" );
const workerPath = __dirname + "/../../feature-workers";
const workers = fs.readdirSync( workerPath );

const nameMunger = name => name.split( "-" ).map( ( x, i ) => i > 0 ? x[ 0 ].toUpperCase() + x.slice( 1 ) : x ).join( "" ).replace( /\.js$/, "" );

class World {

    constructor() {

        this.config = config;
        // auto load workers
        workers.forEach( worker => {

            const Constructor = require( `${workerPath}/${worker}` );
            const memberName = nameMunger( worker );
            this[ memberName ] = new Constructor( this );

        } );

    }

}
module.exports = World;