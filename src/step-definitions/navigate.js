const fs = require( "fs" );
const js = fs.readFileSync( __dirname + "/scripts/navigate.js" ).toString();
const StepBase = require( "./step-base" );

class Navigate extends StepBase {

    static get stepName() { return "Navigate"; }
    static get shape() { return [

        { label: "URL", name: "url", type: "text" } // can't use URL here because relative URLs won't work

    ]; }

    constructor() { super( js ); }

    consume( variables ) {

        const { url } = variables;
        this.args.url = Array.isArray( url ) ? url[ 0 ] : url;

    }

}

module.exports = Navigate;
