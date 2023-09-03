class RepeatChoresController < ApplicationController
    skip_before_action :authorized, only: :create

    def update
        user = User.find(session[:user_id])
        if user.admin
            repeat_chore = RepeatChore.find(params[:id])
            repeat_chore.update!(repeat_chore_params)
            render json: repeat_chore
        end
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

    def create
        user = User.find(session[:user_id])
        if user.admin
            new_repeat_chore = RepeatChore.create!(repeat_chore_params)
           
                if new_repeat_chore.participants.include?("upForGrabs") || new_repeat_chore.participants==[]
                    new_chore = new_repeat_chore.chores.new(
                        title:new_repeat_chore.title,
                        description:new_repeat_chore.description,
                        due_date:new_repeat_chore.due_date,
                        point_value:new_repeat_chore.point_value,
                        completed:0
                    )
                    new_chore.user=user
                    new_chore.image.attach(new_repeat_chore.image.blob)
                    new_chore.save!
                    render json: [new_chore,new_repeat_chore], root: false, status: :created

                elsif new_repeat_chore.cycle_between
                    new_chore = new_repeat_chore.chores.new(
                        title:new_repeat_chore.title,
                        description:new_repeat_chore.description,
                        due_date:new_repeat_chore.due_date,
                        point_value:new_repeat_chore.point_value,
                        completed:0
                    )
                    next_participant = User.find(new_repeat_chore.participants[0])
                    new_chore.user=next_participant
                    new_chore.image.attach(new_repeat_chore.image.blob)
                    new_chore.save!
                    render json: [new_chore,new_repeat_chore], root: false, status: :created

                else
                    new_chore_array = []
                    for x in [*0..new_repeat_chore.participants.length-1] do
                        new_chore = new_repeat_chore.chores.new(
                                            title:new_repeat_chore.title,
                                            description:new_repeat_chore.description,
                                            point_value:new_repeat_chore.point_value,
                                            due_date:new_repeat_chore.due_date,
                                            completed:0
                                            )
                        participant = User.find(new_repeat_chore.participants[x])                       
                        new_chore.user=participant
                        new_chore.image.attach(new_repeat_chore.image.blob)
                        new_chore.save!
                        new_chore_array << new_chore
                    end

                    render json: [*new_chore_array,new_repeat_chore], root: false, status: :created
                end  


            end
        end

    private

    def repeat_chore_params
        params.permit(:title, :description ,:point_value, :cycle_between, :due_date, :image, :participants=>[], :repeat_every=>[])
    end

    def chore_params
        params.permit(:title, :description, :due_date, :image, :point_value)
    end

end