class PrizesController < ApplicationController

    def update
        prize = Prize.find(params[:id])
        prize.update!(prize_params)
        render json: prize
    end

    def index
        prizes = Prize.all
        render json: prizes
    end 

    def create
        valid_id = session[:user_id]
        user = User.find(valid_id)
        if user.admin
            new_prize = Prize.new(prize_params)
            new_prize.user = user
            if params[:how_many_claims]=="1"
                token = RepeatPrize.find_by(title: "Any Single Prize")
                new_prize.repeat_prize = token 
            else
                new_repeat_prize = RepeatPrize.create!(repeat_prize_params)
                new_prize.repeat_prize = new_repeat_prize
            end

            new_prize.save!
            render json: new_prize, status: :created
        else
            render json: {errors: ["unauthorized"]}
        end
    end


    private

    def repeat_prize_params
        params.permit(:title, :description, :point_value, :image, :how_many_claims)
    end 

    def prize_params
        params.permit(:title, :description, :point_value, :image)
    end
end
