class Users::Passwords::ResetsController < ApplicationController
  skip_before_action :require_login

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user
      user.update(reset_password_email_sent_at: nil)
      user.deliver_reset_password_instructions!
    end

    redirect_to root_path, notice: 'Email has been sent to your email'
  end
end