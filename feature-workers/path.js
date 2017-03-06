const assert = require( "assert" );

class Step{
    
    constructor( world ) { this.world = world; }
    
    expectPathStepsSuccess() {
        
        const { client } = this.world;
        client.execute( function() { 
            
            var results = [];
            document.querySelectorAll( "#transcript li" ).forEach( li => 
            
                results.append( { 
                
                    className: li.className, 
                    text: li.textContent,
                    index: results.length
                
                } )
                
            );
            return results;
            
        } ).then( results => {
        
            var failed = results
                .filter( x => !x.className.test( /step-success/ ) )
                .map( x => `Step ${x.index}: ${x.text}` )
                .join( ",\n" );
            if ( failed.length ) {
                
                throw new Error( failed );
                
            }
            
        } );
        
    }
    
}
module.exports = Step;
