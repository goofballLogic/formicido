const scripts = require( "./scripts" );
const paths = require( "./paths" );

function singletonValue( values ) {

    return Array.isArray( values ) ? values[ 0 ] : values;

}
function multiValue( value ) {

    return Array.isArray( value ) ? value : [].concat( value );

}

class Script {

    constructor( data ) {

        this.data = data;
        this.id = data.id;
        if ( !this.id ) { throw new Error( "No id specified" ); }
        this.name = singletonValue( data.name );
        this.paths = data.paths;

    }

    consume( values ) {

        [

            [ "script-name", "name" ],
            [ "path", "paths", true ]

        ].forEach( ( [ key, prop, isMulti ] ) => {

            // only allow singleton values
            const rawValue = values[ key ] || [];
            const value = isMulti ? multiValue( rawValue  ) : singletonValue( rawValue );
            this.data[ prop ] = value;

        } );

    }

    generateJS() {

        const pathMemoisation = {};
        const scriptPaths = this.paths.map( pathId => paths.fetch( pathId ).then( path => path.generateJS( pathMemoisation ) ) );
        return Promise.all( scriptPaths ).then( () => ( {

           pathIds: this.paths,
           paths: pathMemoisation

        } ) );

    }

    save() {

        return scripts.save( this );

    }

    serialize() {

        return this.data;

    }

}

module.exports = Script;
