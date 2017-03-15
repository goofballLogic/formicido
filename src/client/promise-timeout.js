export default function promiseTimeout( timeout, promise, callback ) {
        
    return new Promise( ( resolve, reject ) => {
    
        let isActive = true;
        function deactivate( err ) {
            
            if ( !isActive ) { return false; }
            isActive = false;
            callback( err );
            return true;
            
        }
        
        setTimeout( () => { 
            
            const timedOut = new Error( "Timed out" );
            if ( deactivate( timedOut ) ) {
                
                reject( timedOut );
                
            }
            
        }, timeout );
        promise( function() {
            
            if ( deactivate() ) {
            
                resolve.apply( null, arguments );
                
            }
            
        }, function() {
            
            if ( deactivate() ) {
            
                reject.apply( null, arguments );
                
            }
            
        } );
        
    } );
    
}