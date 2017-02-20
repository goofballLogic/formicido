const { defineSupportCode } = require( "cucumber" );

function World() {
    
    
}

defineSupportCode( function( { setWorldConstructor } ) {
    
    setWorldConstructor( World );
    
} );
