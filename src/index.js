module.exports = function( config, headless ) {

    // update configuration for the config module with injected
    Object.assign( require( "../config" ), config );

    // either browser or headless
    return headless ? require( "./headless" ) : require( "./browser" );

};
