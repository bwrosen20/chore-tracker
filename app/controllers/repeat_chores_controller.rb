class RepeatChoresController < ApplicationController


    def update
        user = User.find(session[:user_id])
        if user.admin
            repeat_chore = RepeatChore.find(params[:id])
            repeat_chore.update!(repeat_chore_params)
            render json: repeat_chore
        end
    end

    def create

    end

    def destroy
        user = User.find(session[:user_id])
        if user.admin
            repeat_chore = RepeatChore.find(params[:id])
            repeat_token = RepeatChore.find_by(title:("Do not repeat"))
            chores = Chore.all.where(repeat_chore_id:repeat_chore.id)
            chores.update_all(repeat_chore_id:repeat_token.id)
            repeat_chore.destroy
            render json: repeat_token
        end
    end


    private

    def repeat_chore_params
        params.permit(:title, :description ,:point_value, :cycle_between, :participants=>[], :repeat_every=>[])
    end
end
