Feature: Command line interface
  As a user of Formicido
  I want to be able to run my script from the command line
  So that I can use it as part of standard scripts (like bash or powershell)

  Background: Well-known script exists
    Given well-known test paths exist:
      | path             |
      | find-charge-poem |
      | nav-to-hello     |
      | a-b-c-a-b        |
    And well-known script "all-three-paths" exists
    And CLI options are "--log-script-events"

    Scenario: Run script headless (CLI)
      When I run the "all-three-paths" script from the CLI
      Then I wait for "Script complete: all-three-paths" to be output to the console 3 times
      