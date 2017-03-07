const PathStep = require( "./path-step" );
const paths = require( "./paths" );

function singletonValue( values ) {
    
    return Array.isArray( values ) ? values[ 0 ] : values;
    
}

class Path {
    
    constructor( data ) {
        
        this.data = data;
        this.id = data.id;
        if ( !this.id ) { throw new Error( "No id specified" ); }
        this.name = singletonValue( data.name );
        const steps = this.data.steps = this.data.steps || [];
        this.steps = steps.map( x => new PathStep( x ) );
        
    }
    
    remove( stepId ) {
        
        this.steps = this.steps.filter( s => s.data.id !== stepId );
        return Promise.resolve();

    }
    
    fetch( stepId ) {

        const found = this.steps.find( s => s.data.id === stepId );
        return found 
            ? Promise.resolve( found )
            : Promise.reject( "Not found" );

    }
    
    fetchOrCreate( stepId, step ) {
    
        const found = this.steps.find( s => s.data.id === stepId );
        if ( found ) { 

            return found;

        } else {

            const newStep = new PathStep( { id: stepId, step } );
            this.steps.push( newStep );
            return this.save().then( () => newStep );

        }

    }
    
    consume( values ) {

        [ 
            
            [ "path-name", "name" ] 
            
        ].filter( ( [ key ] ) => 

            key in values 
        
        ).forEach( ( [ key, prop ] ) => {

            // only allow singleton values
            this.data[ prop ] = singletonValue( values[ key ] );

        } );
        
    }
    
    save() {
        
        return paths.save( this );
        
    }
    
    script() {
    
        return this.steps.map( s => s.script() );
        
    }
    
    serialize() {
    
        this.data.steps = this.steps.map( s => s.serialize() );
        return this.data;
        
    }
    
    stepDescriptions() {
        
        return this.steps.map( s => s.describe() );
        
    }
    
}

module.exports = Path;
