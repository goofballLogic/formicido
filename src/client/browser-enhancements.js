document.addEventListener( "click", function clearButton( e ) {
    
    if ( !( e.target && e.target.classList.contains( "clear-button" ) ) ) { return; }
    var elements = document.querySelectorAll( e.target.getAttribute( "data-selectors" ) );
    elements.forEach( ele => {
        
        if ( ele.innerHTML ) { ele.innerHTML = ""; }
        if ( ele.value ) { ele.value = ""; }
        
    } );
        
} );

document.addEventListener( "click", function redirectFormSubmission( e ) {
        
    if ( e.target.tagName !== "BUTTON" ) { return; }
    if ( !e.target.classList.contains( "redirect-form" ) ) { return; }
    var form = e.target.closest( "form" );
    if ( !form ) { return; }
    var originalAction = form.action;
    form.action = e.target.value;
    setTimeout( function() {
        
        form.action = originalAction;
        
    }, 100 );
    return true;

} );
