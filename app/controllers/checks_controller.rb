class ChecksController < ApplicationController

    def create
        admin = User.find(session[:user_id])
        chore = Chore.find(params[:chore_id])
        user = User.find(chore.user_id)
        if admin.admin
            if chore.check
                check = chore.check.update!(check_params)
            else
                check = chore.check.create!(check_params)
            end
            if params[:approved]
                user.points+=20
                user.save!
            end
            render json: ([chore,user]), status: :created
        else
            render json: {errors: ["Unauthorized"]}
        end
    end

    private

    def check_params
        params.permit(:comment,:approved)
    end
end
