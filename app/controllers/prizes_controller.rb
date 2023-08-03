class PrizesController < ApplicationController

    def update
        prize = Prize.find(params[:id])
        prize.update!(prize_params)
        render json: prize
    end

    private

    def prize_params
        params.permit(:title, :description, :point_value, :image)
    end
end
