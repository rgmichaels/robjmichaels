@ui @smoke
Feature: Home page navigation


  Scenario: Home page loads and displays the expected summary text
    Given I navigate to the home page
    Then the home page should load successfully
    And I should see the professional summary text

  Scenario: Resume page is reachable from home page
    Given I am on the home page
    When I click the "Resume" link on the home page
    Then I should be on "/resume"
    And the destination page should load

  Scenario: Portfolio page is reachable from home page
    Given I am on the home page
    When I click the "Portfolio" link on the home page
    Then I should be on "/portfolio"
    And the destination page should load

  Scenario: Contact page is reachable from home page
    Given I am on the home page
    When I click the "Contact" link on the home page
    Then I should be on "/contact"
    And the destination page should load
