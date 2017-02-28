document.addEventListener( "submit", function( e ) {

    if ( e.target.id === "embedded-browser-controls" ) {
    
        e.preventDefault();
        e.stopPropagation();
        var url = e.target.location.value;
        document.querySelector( "#embedded-browser" ).src = url;
        
    }
    
} );