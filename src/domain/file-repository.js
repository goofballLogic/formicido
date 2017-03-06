const fs = require( "fs" );
const path = require( "path" );
const asy = require( "async" );

const config = require( "../../config" );
const fileRepositoryRoot = config.repo.root;

fs.statSync( fileRepositoryRoot );

// http://stackoverflow.com/a/24311711/275501
function mkdirSync( path ) {

  try {
      
      fs.mkdirSync( path );
  
  } catch(e) {
      
    if ( e.code != 'EEXIST' ) throw e;
    
  }
  
}

function analyseFile( file, callback ) {
    
    fs.stat( file, ( e, stats ) => {

        if ( e ) { callback( e ); } else {

            callback( null, Object.assign( { file }, stats ) );
            
        }
        
    } );

}

function readDirBy( filePath, ordering, callback ) {

    const onlyJSON = x => /\.json$/.test( x );
    const asFullPath = x => path.resolve( filePath, x );
    
    asy.waterfall( [
       
       ( next ) => fs.readdir( filePath, next ),
       ( files, next ) => next( null, files.filter( onlyJSON ).map( asFullPath ) ),
       ( filePaths, next ) => asy.map( filePaths, analyseFile, next ),
       ( fileInfo, next ) => next( null, ordering( fileInfo ) )
       
    ], callback );

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
    
    listRecent( maxNumber ) {
    
        const asObjectDescriptor = stats => ( {
            
            id: /([^\/]*)\.json$/.exec( stats.file )[ 1 ],
            modified: stats.mtime,
            created: stats.ctime
            
        } );
        
        return new Promise( ( resolve, reject ) => {
            
            readDirBy( this.partitionPath, files =>
            
                [].concat( files ).sort( ( a, b ) => 
                    
                    b.mtime.getTime() - a.mtime.getTime() 
                
                )
            , ( e, sortedFiles ) => {
                
                if ( e ) { reject( e ); } else {
                    
                    resolve( sortedFiles.slice( 0, maxNumber ).map( x => asObjectDescriptor( x ) ) );
                    
                }
                
            } );
            
        } );

    }
    
    save( objectId, obj ) {
        
        return FileRepository.write( this.objectPath( objectId ), FileRepository.serialize( obj ) );
        
    }
    
}
module.exports = FileRepository;
