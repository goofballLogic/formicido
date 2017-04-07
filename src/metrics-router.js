const express = require( "express" );
const promClient = require( "prom-client" );

const router = new express.Router();
router.get( "/", ( req, res ) => {

    res.type( "text/plain" ).send( promClient.register.metrics() );

} );

module.exports = router;
