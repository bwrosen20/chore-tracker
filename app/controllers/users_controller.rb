class UsersController < ApplicationController
    skip_before_action :authorized, only: [:createAccount, :signup]
    include Rails.application.routes.url_helpers

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
        current_user = User.find(session[:user_id])
        users = User.all
        render json: [current_user,*users]
    end

    def update
        user = User.find(session[:user_id])
        admin = User.where("admin=? and group_name=?",true,user.group_name).first
        prize = Prize.find(params[:prize_id])
        repeat_prize = RepeatPrize.find(prize.repeat_prize_id)
        if user.points >= prize.point_value
            user.points-=prize.point_value
            prize.user = user
            prize.save!
            user.save!
            if repeat_prize.how_many_claims!=100
                repeat_prize.how_many_claims-=1
                repeat_prize.save!
            end
            if repeat_prize.how_many_claims>0
                new_prize = admin.prizes.create({
                    title:repeat_prize.title,
                    description:repeat_prize.description,
                    point_value:repeat_prize.point_value
                })
                new_prize.image.attach(repeat_prize.image.blob) 
                new_prize.repeat_prize = repeat_prize
                new_prize.save!
            end
            render json: [prize,new_prize]
        else
            render json: {errors: ["Not enough points"]}, status: :unprocessable_entity 
        
        end
    end


    private

    def user_params
        params.permit(:username, :group_name, :password, :password_confirmation, :email, :profile_image)
    end 
end
