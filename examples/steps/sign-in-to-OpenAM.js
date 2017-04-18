const StepBase = require( "../../src/step-definitions/step-base" );

const fs = require( "fs" );
const js = fs.readFileSync( __dirname + "/scripts/sign-in-to-OpenAM.js" ).toString();

const detectLogin= fs.readFileSync( __dirname + "/scripts/OpenAM/detect-login.js" ).toString();
const signIn = fs.readFileSync( __dirname + "/scripts/OpenAM/sign-in.js" ).toString();

class SignInToOpenAM extends StepBase {

    static get stepName() { return "Sign in to OpenAM"; }
    static get shape() { return [

        { label: "Username", name: "username", type: "text" },
        { label: "Password", name: "password", type: "password" }

    ]; }

    constructor() {

        super( js, { detectLogin, signIn } );

    }

    consume( variables ) {

        this.args.username = variables.username;
        this.args.password = variables.password;

    }

}

module.exports = SignInToOpenAM;
// openam/XUI/#login