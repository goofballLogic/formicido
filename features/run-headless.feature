Feature: Run script in headless browser
  As a user of Formicido
  I want to be able to run my script in zombie
  So that I can run the monitor for long periods of time without e.g. memory leaks

  Background: Well-known script exists
    Given well-known test paths exist:
      | path             |
      | find-charge-poem |
      | nav-to-hello     |
      | a-b-c-a-b        |
    And well-known script "all-three-paths" exists
    And well-known test paths exist:
      | path             |
      | nav-to-missing   |
    And well-known script "one-dodgy-path" exists
    
    Scenario: Invoke a single run
      When I invoke a headless run for "all-three-paths"
      Then the headless run should complete without error
    
    Scenario: Run a script until three completed runs are logged
      When I invoke a continuous headless run for "all-three-paths"
      Then I wait for the "script-complete" event to be emitted 3 times

    Scenario: Serve metrics from continuous script
      When I invoke a continuous headless run for "all-three-paths"
      Then I wait for the script collected metric to reach 3
    
    Scenario: Record the state of the browser on step failure
      When I invoke a continuous headless run for "one-dodgy-path"
       And I wait for the "script-complete" event to be emitted 2 times
      Then the diagnostics folder should contain 2 failure files
       And the failure files should all contain
        | prop      | value                            |
        | path      | 2                                |
        | step      | 1                                |
        | location  | http://localhost:8124/dodgy-path |
       And the failure files should all have HTML matching "The Charge of the Light Brigade"
