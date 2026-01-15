@ui @smoke
Feature: Portfolio page

  Scenario: Portfolio page loads quickly and shows profile links
    Given I navigate to the portfolio page
    Then the portfolio page should respond successfully
    And the portfolio page should load in under 2 seconds
    And I should see a LinkedIn link pointing to "https://www.linkedin.com/in/robert-michaels-7a989aa/"
    And I should see a GitHub link pointing to "https://github.com/rgmichaels"

