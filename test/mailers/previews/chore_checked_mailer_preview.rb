# Preview all emails at http://localhost:3000/rails/mailers/chore_checked_mailer
class ChoreCheckedMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/chore_checked_mailer/chore_was_checked
  def chore_was_checked
    ChoreCheckedMailer.with(user: User.second, chore: Chore.last).chore_was_checked
  end

end
