function valuesFor( key, args ) {

    return Array.isArray( args[ key ] )
        ? args[ key ].join( ", " )
        : args[ key ] || "";

}
class StepBase {

    constructor( js, constants ) {

        this.js = js;
        this.constants = constants || {};
        this.args = {};

    }

    consume( variables ) {

        throw new Error( "Implement consume( variables ) to set arguments to your script" );

    }

    script() {

        const argsList = Object.keys( this.args )
            .map( key => [ key, valuesFor( key, this.args ) ] )
            .map( ( [ key, values ] ) => `${key}: ${values}` )
            .join( ", " );

        return {

            script: this.js,
            constants: this.constants,
            args: this.args,
            description: this.constructor.stepName + " (" + argsList + ")"

        };

    }

}
module.exports = StepBase;
