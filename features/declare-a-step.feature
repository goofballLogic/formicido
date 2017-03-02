Feature: Declare a step
  As a user of Formicido
  I want to be able to declare steps
  So that I can compose them into paths of behaviour
  
  Background:
    Given I have opened formicido
      And I follow the "Steps" link
     
  Scenario: Navigate to a new URL
     When I follow the "Navigate" link
      And I enter form values
        | label  | relative-path |
        | URL    | /hello-world   |
      And I click the "Run" button and wait for the "run-complete" event
     Then the frame's location should be "${root}/hello-world"
      And the frame's text should contain "Hello world"
      And the outcome should be "Complete."

  Scenario: Click then wait for location to change
     When I follow the "Click then wait for new location" link
      And I navigate the embedded browser to "${root}/some-links"
      And I enter form values
        | label          | value         |
        | Query selector | .link-to-poem |
      And I click the "Run" button and wait for the "run-complete" event
     Then the frame's text should contain "The Charge of the Light Brigade"
      And the outcome should be "Complete."

  Scenario: Failed step should be detectable
     When I follow the "Click then wait for new location" link
      And I enter form values
        | label          | value         |
        | Query selector | .im-not-there |
      And I click the "Run" button and wait for the "run-complete" event
     Then the outcome should contain "Complete"
      And the outcome should contain "Timed out"
      And the outcome should contain "Error"
