Feature: Declare a step
  As a user of Formicado
  I want to be able to declare steps
  So that I can compose them into paths of behaviour
  
  Scenario: A simple step
    Given I have opened formicado
     When I select the "Navigate to" step
      And I enter the step values
        | label  | path        |
        | URL    | hello-world |
      And I click the "Run" step button
     Then the frame's location should be "${root}/hello-world"
      And the frame's text should contain "Hello world"
        