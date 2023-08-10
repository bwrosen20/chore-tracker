class ChecksController < ApplicationController

    def create
        admin = User.find(session[:user_id])
        chore = Chore.find(params[:chore_id])
        user = User.find(chore.user_id)
        if admin.admin
            if chore.check
                check = chore.check.update!(check_params)
            else
                check = Check.create(check_params)
                check.chore=chore
                check.save!
            end
            if params[:approved]=="approved"
                user.points+=20
                user.save!
            else
                chore.completed=false
                chore.save!
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
