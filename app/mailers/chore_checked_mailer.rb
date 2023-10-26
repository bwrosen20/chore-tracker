class ChoreCheckedMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.chore_checked_mailer.chore_was_checked.subject
  #
  def chore_was_checked
    @greeting = "Hi"
    @points = params[:chore].point_value
    @chore = params[:chore].title
    @name = params[:user].username

    mail(
        to: params[:user].email,
        subject: "Your Earned Points!"
    )
  end
end
