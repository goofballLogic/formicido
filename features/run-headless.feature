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
    
    Scenario: Invoke a single run
      When I invoke a headless run for "all-three-paths"
      Then the headless run should complete without error
    
    Scenario: Run a script until three completed runs are logged
      When I invoke a continuous headless run for "all-three-paths"
      Then I wait for the "script-complete" event to be emitted 3 times
