const StepBase = require( "../src/step-definitions/step-base" );

const fs = require( "fs" );
const js = fs.readFileSync( __dirname + "/scripts/login-as-needed.js" ).toString();

const detectFakeLoginPage = fs.readFileSync( __dirname + "/scripts/remote/detect-fake-login-page.js" ).toString();

class LoginAsNeeded extends StepBase {

    static get stepName() { return "Login as needed"; }
    static get shape() { return [

        { label: "Username", name: "username", type: "text" },
        { label: "Password", name: "password", type: "password" }

    ]; }

    constructor() {

        super( js );
        this.args.detectFakeLoginPage = detectFakeLoginPage;

    }

    consume( variables ) {

        this.args.username = variables.username;
        this.args.password = variables.password;

    }

}

module.exports = LoginAsNeeded;
