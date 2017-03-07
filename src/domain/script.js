const scripts = require( "./scripts" );

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
    
    remove( pathId ) {
        
        //this.steps = this.steps.filter( s => s.data.id !== pathId );
        //return Promise.resolve();

    }
    
    fetch( pathId ) {

        /*const found = this.steps.find( s => s.data.id === pathId );
        return found 
            ? Promise.resolve( found )
            : Promise.reject( "Not found" );
        */

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
    
    save() {
        
        return scripts.save( this );
        
    }
    
    serialize() {
    
        return this.data;
        
    }
    
    stepDescriptions() {
        
        throw new Error( "Not implemented" );
        //return this.steps.map( s => s.describe() );
        
    }
    
}

module.exports = Script;
