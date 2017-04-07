const { defineSupportCode } = require( "cucumber" );

defineSupportCode( function( { Given, When, Then } ) {

    Then( "the diagnostics folder should contain {int} failure files", function( count ) {

        return this.diagnostics.expectFailureFiles( count );

    } );

    Then( "the failure files should all contain", function( expectedTable ) {

        return this.diagnostics.expectFailureFileProps( expectedTable.hashes() );

    } );

    Then( "the failure files should all have HTML matching {stringInDoubleQuotes}", function( expected ) {

        return this.diagnostics.expectFailureFileContentMatching( expected );

    } );

} );