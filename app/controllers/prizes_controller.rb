class PrizesController < ApplicationController
    skip_before_action :authorized, only: :index

    def update
        prize = Prize.find(params[:id])
        prize.update!(prize_params)
        render json: prize
    end

    def index
        prizes = Prize.all
        render json: prizes
    end 

    private

    def prize_params
        params.permit(:title, :description, :point_value, :image)
    end
end
