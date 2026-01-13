@ui @smoke
Feature: Home page

  @regression
  Scenario: Home page loads and displays the expected summary text
    Given I navigate to the home page
    Then the home page should load successfully
    And I should see the professional summary text
