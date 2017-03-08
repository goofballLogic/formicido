const path = require( "path" );
const fs = require( "fs" );

class Script {

    constructor( world ) {
        
        this.world = world;
        
    }
    
    createWellKnownScript( scriptId ) {

        const pristinePath = path.resolve( __dirname, `../feature-data-pristine/script--${scriptId}.json` );
        const fileSystemPath = path.resolve( __dirname, `../data/scripts/${scriptId}.json` );
        const script = require( pristinePath );
        const { paths } = script;
        return this.world.path.createWellKnownPaths( paths ).then( () => 
        
            new Promise( ( resolve, reject ) => 
            
                fs.writeFile( fileSystemPath, JSON.stringify( script, null, 1 ), e => e ? reject( e ) : resolve() )
                
            )
            
        );
    
    }

}

module.exports = Script;
