class ChoresController < ApplicationController

    def create
        user = User.find(session[:user_id])
        if user.admin
            chore = Chore.new(chore_params)
            chore.user = user
            chore.completed=false
            if params[:repeat_every]=="once"
                token = Chore.find_by(title:"Do not repeat")
                chore.repeat_chore = token
            else 
                new_repeat = RepeatChore.create!(repeat_chore_params)
                chore.repeat_chore = new_repeat
            end
            chore.save!
        else
            render json: {errors: ["unauthorized"]}
        end
        render json: chore, status: :created
    end

    private

    def chore_params
        params.permit(:title, :description, :due_date, :image, :point_value)
    end

    def repeat_chore_params
        params.permit(:title, :description, :image, :point_value, :repeat_every)
    end
end
