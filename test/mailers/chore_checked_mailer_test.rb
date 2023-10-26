require "test_helper"

class ChoreCheckedMailerTest < ActionMailer::TestCase
  test "chore_was_checked" do
    mail = ChoreCheckedMailer.chore_was_checked
    assert_equal "Chore was checked", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
