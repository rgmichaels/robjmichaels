@smoke
Feature: Home page smoke test

  Scenario: Home page loads successfully
    Given I navigate to the home page
    Then the home page should respond successfully
    And the page title should be visible
