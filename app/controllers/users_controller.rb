class UsersController < ApplicationController
    skip_before_action :authorized, only: [:createAccount, :signup]

    def createAccount
        new_admin = User.new(user_params)
        new_admin.admin=true
        new_admin.save!
        render json: new_admin, status: :created
    end 

    def signup
        admin=User.find_by(group_name:params[:group_name])
            if admin
                new_user = User.new(user_params)
                new_user.admin=false
                new_user.save!
                render json: new_user, status: :created
            else
                render json: {errors: ["Group must have admin"]}, status: :not_found
            end
    end


    private

    def user_params
        params.permit(:username, :group_name, :password, :password_confirmation, :email, :profile_image)
    end 
end
