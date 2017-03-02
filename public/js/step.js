document.addEventListener( "fetch-result", function( e ) {
    
    var json = e.detail;
    document.querySelector( "#code" ).innerHTML = json.script;
    document.querySelector( "#outcome" ).innerHTML = "Running...";
    function recordOutcome( outcomeEvent ) {
        
        document.removeEventListener( "run-complete", recordOutcome );
        document.querySelector( "#outcome" ).innerHTML = "Complete.";
        if ( outcomeEvent.detail.err ) {
        
            document.querySelector( "#outcome" ).innerHTML += " " + outcomeEvent.detail.err;
            
        }
        
    }
    document.addEventListener( "run-complete", recordOutcome );
    document.dispatchEvent( new CustomEvent( "run-script", { detail: json } ) );

} );
