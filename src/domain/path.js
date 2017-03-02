const PathStep = require( "./path-step" );
const paths = require( "./paths" );

class Path {
    
    constructor( data ) {
        
        this.data = data;
        this.id = data.id;
        if ( !this.id ) { throw new Error( "No id specified" ); }
        const steps = this.data.steps = this.data.steps || [];
        this.steps = steps.map( x => new PathStep( x ) );
        
    }
    
    fetchOrCreate( stepId, step ) {

        const found = this.steps.find( s => s.id === stepId );
        if ( found ) { 
            
            return found;
            
        } else {
        
            const newStep = new PathStep( { id: stepId, step } );
            this.steps.push( newStep );
            return this.save().then( () => newStep );
            
        }

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
    
}

module.exports = Path;
