Feature: Command line interface
  As a user of Formicido
  I want to be able to run my script or server from the command line
  So that I can use it as part of standard scripts (like bash or powershell)

  Background: Well-known script exists
    Given well-known test paths exist:
      | path             |
      | find-charge-poem |
      | nav-to-hello     |
      | a-b-c-a-b        |
    And well-known script "all-three-paths" exists

    Scenario: Run script headless (CLI)
      Given CLI options are "--log-script-events"
       When I run the "all-three-paths" script from the CLI
       Then I wait for "Script complete: all-three-paths" to be output to the console 3 times

    Scenario: Start server (CLI)
      Given CLI options are "--port 8888 --origin http://localhost:8888 --host 0.0.0.0"
       When I launch the server
       Then I should be able to download the agent script from "http://localhost:8888/agent" containing the origin "http://localhost:8888"
        And I should be able to browse to "http://localhost:8888/scripts"

    Scenario: Require a data path
      Given CLI options are "--port 8888 --origin http://whatever"
        And no repo option is supplied
       When I attempt launch the server it should fail with message "You must specify the file-path where script data is stored (using the --repo argument)."
