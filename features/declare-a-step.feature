Feature: Declare a step
  As a user of Formicido
  I want to be able to declare steps
  So that I can compose them into paths of behaviour
  
  Scenario: A simple step
    Given I have opened formicido
     When I follow the "Steps" link
      And I follow the "Navigate" link
      And I enter form values
        | label  | relative-path |
        | URL    | /hello-world   |
      And I click the "Run" button and wait for the "run-complete" event
     Then the frame's location should be "${root}/hello-world"
      And the frame's text should contain "Hello world"
        