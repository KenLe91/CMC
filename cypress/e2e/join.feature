Feature: Join functionality

  Scenario: Create new User with valid value
    Given I Am on a Home Page
    When I click on Account Menu and click on Join
    And I should be redirected to the join page
    And I click on Create Account
    And I should see the create account form
    And The checkbox with id "myer-marketing" should be unselected
    And I fill in registration form with valid value
    And I should see the "success" message "8 Characters"
    And I should see the "success" message "1 uppercase letter"
    And I should see the "success" message "1 number"
    Then I create new account successfully and navigate to the My Account page

  Scenario: Create new User with Manual Address
    Given I Am on a Home Page
    When I click on Account Menu and click on Join
    And I should be redirected to the join page
    And I click on Create Account
    And I should see the create account form
    And I fill in registration form with address manualy
    Then I create new account successfully and navigate to the My Account page

  Scenario: Create new User with invalid value
    Given I Am on a Home Page
    When I click on Account Menu and click on Join
    And I should be redirected to the join page
    And I click on Create Account
    And I should see the create account form
    And I fill in registration form with invalid value
    And I can see invalid credentials message of id "password-error-text" should have text "Please enter a valid password"
    And I can see invalid credentials message of id "first-name-error-text" should have text "Please enter a valid name"
    And I can see invalid credentials message of id "last-name-error-text" should have text "Please enter a valid name"
    And I can see invalid credentials message of id "mobile-phone-error-text" should have text "Please enter a valid Australian mobile number"
    And I can see invalid credentials message of id "address-error-text" should have text "Please enter a valid address"
    And I should see the "error" message "8 Characters"
    And I should see the "error" message "1 uppercase letter"
    Then I should see the "error" message "1 number"

  Scenario: Check function hidden password text
    Given I Am on a Home Page
    When I click on Account Menu and click on Join
    And I should be redirected to the join page
    And I click on Create Account
    And I should see the create account form
    And I should not see the password
    And I click on icon hidden password
    Then I should see the password

  Scenario: Check function check invalid password
    Given I Am on a Home Page
    When I click on Account Menu and click on Join
    And I should be redirected to the join page
    And I click on Create Account
    And I should see the create account form
    And I fill "<password>" on the password field
    Then I should see the "<stt_character>" message "<character_message>"
    And I should see the "<stt_uppercase>" message "<uppercase_message>"
    And I should see the "<stt_number>" message "<number_message>"
    Examples:
      | password | stt_character | character_message | stt_uppercase | uppercase_message  | stt_number | number_message |
      | abcdyurc | success       | 8 Characters      | error         | 1 uppercase letter | error      | 1 number       |
      | Abcdyurc | success       | 8 Characters      | success       | 1 uppercase letter | error      | 1 number       |
      | Abcdy1r  | error         | 8 Characters      | success       | 1 uppercase letter | success    | 1 number       |
      | 1        | error         | 8 Characters      | error         | 1 uppercase letter | success    | 1 number       |