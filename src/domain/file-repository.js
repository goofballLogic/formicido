const fs = require( "fs" );
const path = require( "path" );

const config = require( "../../config" );
const fileRepositoryRoot = config.repo.root;

fs.statSync( fileRepositoryRoot );

// http://stackoverflow.com/a/24311711/275501
function mkdirSync( path ) {

console.log( path );  
  try {
      
      fs.mkdirSync( path );
  
  } catch(e) {
      
    if ( e.code != 'EEXIST' ) throw e;
    
  }
  
}

class FileRepository {
    
    constructor( partition ) {
        
        this.ext = "json";
        this.partition = partition;
        this.partitionPath = path.resolve( fileRepositoryRoot, partition );
        mkdirSync( this.partitionPath );
        
    }
    
    static parse( data ) {
        
        return new Promise( ( resolve, reject ) => {
        
            try { resolve( JSON.parse( data ) ); } catch ( e ) { reject( e ); }
            
        } );
        
    }
    
    static serialize( data ) {
        
        return JSON.stringify( data, null, 1 );
        
    }
    
    static read( filePath ) {
        
        return new Promise( ( resolve, reject ) =>
            fs.readFile( filePath, ( e, data ) => 
                e ? reject( e ) : resolve( data )
            )
        );
            
    }
    
    static write( filePath, data ) {
        
        return new Promise( ( resolve, reject ) => 
            fs.writeFile( filePath, data, e =>
                e ? reject( e ) : resolve()
            )
        );

    }
    
    objectPath( objectId ) {
        
        return path.resolve( this.partitionPath, `${objectId}.${this.ext}` );
        
    }
    
    fetch( objectId ) {
        
        return FileRepository.read( this.objectPath( objectId ) )
            .then( data => FileRepository.parse( data ) )
            .then( parsed => {
                
                if ( parsed.id !== objectId ) { throw new Error( "Invalid object: " + objectId ); }
                return parsed;
                
            } );
        
    }
    
    fetchOr( objectId, handleNotExists ) {
        
         return this.fetch( objectId )
            .catch( e => {
                
                if ( !( e && e.code === "ENOENT" ) ) { 
                    
                    throw e; 
                    
                } else {
                
                    return handleNotExists();
                    
                }
                
            } );
            
    }
    
    fetchOrDefault( objectId, defaultObject ) {
        
        return this.fetchOr( objectId, () => defaultObject );

    }
    
    fetchOrCreate( objectId, defaultObject ) {
    
        return this.fetchOr( objectId, () => {
            
            const filePath = this.objectPath( objectId );
            return FileRepository.write( filePath, FileRepository.serialize( defaultObject ) )
                .then( () => this.fetch( objectId ) );
                
        } );
        
    }
    
    save( objectId, obj ) {
        
        return FileRepository.write( this.objectPath( objectId ), FileRepository.serialize( obj ) );
        
    }
    
}
module.exports = FileRepository;
