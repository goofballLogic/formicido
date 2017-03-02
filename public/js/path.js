document.addEventListener( "fetch-result", function( e ) {
    
    var json = e.detail;
    document.querySelector( "#code" ).innerHTML = JSON.stringify( json, null, 3 );
    
    document.querySelector( "#outcome" ).innerHTML = "Running step 1...";
    function recordOutcome( outcomeEvent ) {
        
        document.removeEventListener( "run-complete", recordOutcome );
        document.querySelector( "#outcome" ).innerHTML = "Step 1 complete.";
        if ( outcomeEvent.detail.err ) {
        
            document.querySelector( "#outcome" ).innerHTML += " " + outcomeEvent.detail.err;
            
        }
        
    }
    document.addEventListener( "run-complete", recordOutcome );
    document.dispatchEvent( new CustomEvent( "run-script", { detail: json[ 0 ] } ) );

} );