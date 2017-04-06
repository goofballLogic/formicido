const config = require( "../../config" );
const requireRepo = () => require( ( config.repo ? config.repo.module : "" ) || "./file-repository" );

// pre-export this module so script can reference it
module.exports = {};

let _lazyLoadedRepo = null;
const repo = () => {

    if ( !_lazyLoadedRepo ) {

        const Repo = requireRepo();
        _lazyLoadedRepo = new Repo( "scripts" );
        
    }
    return _lazyLoadedRepo;
    
};

const Script = require( "./script" );

Object.assign( module.exports, {

    fetch( scriptId ) {

        return repo().fetch( scriptId )
            .then( data => new Script( data ) );

    },
    
    fetchOrDefault( scriptId ) {
        
        return repo().fetchOrDefault( scriptId, { id: scriptId, paths: [] } )
            .then( data => new Script( data ) );
        
    },
    
    fetchOrCreate( scriptId ) {

        return repo().fetchOrCreate( scriptId, { id: scriptId } )
            .then( data => new Script( data ) );
            
    },
    
    save( script ) {
        
        return repo().save( script.id, script.serialize() );
        
    },
    
    listRecent( maxNumber ) {

        return repo().listRecent( maxNumber ).then( objects => {

            return Promise.all( objects.map( o => this.fetch( o.id ) ) ).then( fetched => {

                return fetched.map( x => Object.assign( 
                    
                    objects.find( o => o.id == x.id ),
                    { name: x.name || "(unnamed)" }
                
                ) );

            } );

        } );

    }
    
} );
