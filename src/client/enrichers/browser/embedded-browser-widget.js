export default function embeddedBrowser( ns ) {
    
    const { bus } = ns;
    
    document.addEventListener( "submit", function( e ) {
    
        if ( e.target.id === "embedded-browser-controls" ) {
        
            e.preventDefault();
            e.stopPropagation();
            var url = e.target.location.value;
            document.querySelector( "#embedded-browser" ).src = url;
            
        }
        
    } );
    
    bus.on( "navigate-to", url => {
        
        var frame = document.querySelector( "#embedded-browser" );   
        var isActive = true;
        var giveup = setTimeout( function() {
        
            if ( !isActive ) { return; }
            isActive = false;
            frame.removeEventListener( "load", waiter );
            bus.emit( "navigate-to-complete", { url, err: new Error( "Timed out" ) } );

        }, 10000 );
    
        function waiter() { 
        
            if ( !isActive ) { return; }
            frame.removeEventListener( 'load', waiter );
            clearTimeout( giveup );
            bus.emit( "navigate-to-complete", { url } );
            
        }
        frame.addEventListener('load', waiter);
        frame.setAttribute( "src", url );
        
    } );
    
}
