export default function( ns ) {
    
    const { bus } = ns;
    window.addEventListener( "DOMContentLoaded", () => {

        if( !document.body.classList.contains( "step-page" ) ) { return; }
        bus.on( "fetch-result", detail => {

            document.querySelector( "#code" ).innerHTML = detail.script;
            document.querySelector( "#outcome" ).innerHTML = "Running...";
            bus.emit( "run-step", detail );
    
        } );

        bus.on( "step-complete", detail => {
            
            document.querySelector( "#outcome" ).innerHTML = "Complete.";
            if ( detail.err ) {
    
                document.querySelector( "#outcome" ).innerHTML += " " + detail.err;
                
            } 
            
        } );
        
    } );

}
