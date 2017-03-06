Feature: Declare a path
  As a user of Formicido
  I want to be able to declare a path
  So that I can compose multiple configured steps together
  
  Background:
    Given I have opened formicido
      And I follow the "Paths" link
     
  Scenario: Create a path with a navigate and a click step
     When I click the "Create" link and wait for URL to change
      And I enter form values
        | label  | value       |
        | Name   | Nav'n'Click |
      And I select "Navigate" from the "Add a new step" dropdown
      And I click the "Configure..." button and wait for the URL to change
      And I enter form values
        | label  | relative-path |
        | URL    | /some-links   |
      And I click the "Add step" button and wait for the URL to change
      And I select "Click then wait for new location" from the "Add a new step" dropdown
      And I click the "Configure..." button and wait for the URL to change
      And I enter form values
        | label          | value         |
        | Query selector | .link-to-poem |
      And I click the "Add step" button and wait for the URL to change
      And I click the "Run" button and wait for the "path-complete" event
     Then the frame's text should contain "The Charge of the Light Brigade"
      And all steps should have succeeded
  
  Scenario: Create a path with a navigate step and a click step, then delete the navigate step
     When I click the "Create" link and wait for URL to change
      And I enter form values
        | label  | value       |
        | Name   | Nav'n'Click |
      And I select "Navigate" from the "Add a new step" dropdown
      And I click the "Configure..." button and wait for the URL to change
      And I enter form values
        | label  | relative-path |
        | URL    | /some-links   |
      And I click the "Add step" button and wait for the URL to change
      And I select "Click then wait for new location" from the "Add a new step" dropdown
      And I click the "Configure..." button and wait for the URL to change
      And I enter form values
        | label          | value         |
        | Query selector | .link-to-poem |
      And I click the "Add step" button and wait for the URL to change
      And I click the "Delete" link for step 1 and wait for the URL to change
      And I click the "Confirm" button and wait for the URL to change
     Then there should be 1 steps shown
      