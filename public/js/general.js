document.addEventListener( "fetch-error", e => {
    
    var errBlock = document.createElement( "li" );
    var timeBlock = document.createElement( "time" );
    timeBlock.innerHTML = new Date().toLocaleDateString();
    var messageBlock = document.createElement( "div" );
    messageBlock.innerHTML = e.detail;
    errBlock.appendChild( timeBlock );
    errBlock.appendChild( messageBlock );
    errBlock.classList.add( "goes" );
    document.querySelector( ".errors" ).appendChild( errBlock );
    setTimeout( function() {
        
        errBlock.classList.add( "going" );
        setTimeout( function() { errBlock.remove(); }, 500 );
        
    }, 5000 );
    
    
} );

document.addEventListener( "run-script", e => {
    
    var frame = document.querySelector( "#embedded-browser" );
    if ( !frame ) {
        
        console.warn( "No embedded browser" );
        
    } else {
        
        var script = new Function( "frame", "exec", "done", e.detail.script );
        try {
            script( frame, function( js ) {
                
                // reply
                //frame.contentWindow.postMessage( "(function(done){" + js + ";}(reply(console.log(document.body);", "*" );
                
            }, function() {
            
                document.dispatchEvent( new CustomEvent( "run-complete", { detail: e } ) );
                
                
            } );
            
        } catch( err ) {
            
            console.log( "Script failed", e.detail.script );
            throw err;
            
        }
        
    }
    
} );