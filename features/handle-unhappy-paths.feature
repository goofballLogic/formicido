Feature: Handle unhappy path scenarios
  As a user of Formicido
  I want to be able to use paths to compensate for failure in another path
  So that changeable situations (such as sign-in timeouts) can be accommodated

  Background:
    Given well-known test paths exist:
        | path               |
        | nav-to-secure-home |
        | login-as-needed    |
      And well-known steps exist:
        | step            |
        | login-as-needed |
      And I have opened formicido
      And I follow the "Paths" link
      And I navigate to the "Navigate to a secured home page" path

  Scenario: Associate compensation path to existing path
    Given I click the "Add unhappy path(s)..." link and wait for the URL to change
     When I select checkboxes for "Paths"
        | Name                               |
        | Log in to secure area if necessary |
      And I click the "Save" button and wait for the URL to change
     Then the path's compensation paths should include "Log in to secure area if necessary"
