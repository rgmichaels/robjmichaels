@ui @smoke

Feature: Contact page

  Scenario: Contact page loads quickly and displays contact details
    Given I navigate to the contact page
    Then the contact page should respond successfully
    And the contact page should load in under 2 seconds
    And I should see my contact details on the contact page
