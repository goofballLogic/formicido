Feature: Declare a script
  As a user of Formicido
  I want to be able to declare a script
  So that I can compose a repeating sequence of paths, and run them to generate events
  
  Background: Three created paths, then go to scripts and click Create
    Given well-known test paths exist:
      | path             |
      | find-charge-poem |
      | nav-to-hello     |
      | a-b-c-a-b        |
    And I have opened formicido
    And I follow the "Scripts" link
    And I click the "Create" link and wait for URL to change

  Scenario: Create a script from two paths and save
    When I select checkboxes for "Paths"
      | Name             |
      | Find TCOTLB poem |
      | Alphabet hell    |
    And I click the "Save" button and wait for the page to reload
    Then the checked checkboxes for "Paths" should be
      | Name             |
      | Find TCOTLB poem |
      | Alphabet hell    |
