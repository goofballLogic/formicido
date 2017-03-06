const config = require( "../../config" );
const Repo = require( ( config.repo ? config.repo.module : "" ) || "./file-repository" );
const repo = new Repo( "paths" );

// pre-export this module so path can reference it
module.exports = {};

const Path = require( "./path" );

Object.assign( module.exports, {

    fetch( pathId ) {

        return repo.fetch( pathId )
            .then( data => new Path( data ) );

    },
    
    fetchOrDefault( pathId ) {
        
        return repo.fetchOrDefault( pathId, { id: pathId } )
            .then( data => new Path( data ) );
        
    },
    
    fetchOrCreate( pathId ) {

        return repo.fetchOrCreate( pathId, { id: pathId } )
            .then( data => new Path( data ) );
            
    },
    
    save( path ) {
        
        return repo.save( path.id, path.serialize() );
        
    },
    
    listRecent( maxNumber ) {

        return repo.listRecent( maxNumber ).then( objects => {

            return Promise.all( objects.map( o => this.fetch( o.id ) ) ).then( fetched => {

                return fetched.map( x => Object.assign( 
                    
                    objects.find( o => o.id == x.id ),
                    { name: x.name || "(unnamed)" }
                
                ) );

            } );

        } );

    }
    
} );
