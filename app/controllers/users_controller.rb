class UsersController < ApplicationController
    skip_before_action :authorized, only: [:createAccount, :signup, :show]

    def createAccount
        new_admin = User.new(user_params)
        new_admin.admin=true
        new_admin.save!
        session[:user_id]=new_admin.id
        users = User.all
        render json: users, status: :created
    end 

    def signup
        admin=User.find_by(group_name:params[:group_name])
            if admin
                new_user = User.new(user_params)
                new_user.admin=false
                new_user.save!
                session[:user_id]=new_user.id
                users = User.all
                render json: users, status: :created
            else
                render json: {errors: ["Group must have admin"]}, status: :not_found
            end
    end

    def index
        current_user = User.find(session[:user_id])
        users = User.where(group_name:current_user.group_name)
        render json: users
    end

    def show
        # current_user = User.find(session[:user_id])
        current_user = User.find(1)
        users = User.all
        render json: [current_user,*users]
    end


    private

    def user_params
        params.permit(:username, :group_name, :password, :password_confirmation, :email, :profile_image)
    end 
end
