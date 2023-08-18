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
                    render json: [new_chore], status: :created

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
                    render json: [new_chore], status: :created

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

                    render json: new_chore_array, status: :created
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


# if ["day","week","month"].include?(new_repeat_chore.repeat_every[0])
#     new_date = if new_repeat_chore.repeat_every[0]=="day"
#                     Chronic.parse("tomorrow").time.to_s.slice(0,10)+"T"+new_time
#                 else
                    
#                     Chronic.parse("next #{new_repeat_chore.repeat_every[0]}").time.to_s.slice(0,10)+"T"+new_time
#                 end
            
# else
#     current_day = time.wday
#     day_array = ((new_repeat_chore.repeat_every).map{|day| day.to_i}).sort
#     next_chore_day = day_array.filter{|day|day>current_day}[0]? day_array.filter{|day|day>current_day}[0] : day_array[0]
#     new_date=case next_chore_day
#     when 1  
#         Chronic.parse("monday").time.to_s.slice(0,10)+"T"+new_time
#     when 2
#         Chronic.parse("tuesday").time.to_s.slice(0,10)+"T"+new_time
#     when 3
#         Chronic.parse("wednesday").time.to_s.slice(0,10)+"T"+new_time
#     when 4
#         Chronic.parse("thursday").time.to_s.slice(0,10)+"T"+new_time
#     when 5
#         Chronic.parse("friday").time.to_s.slice(0,10)+"T"+new_time
#     when 6
#         Chronic.parse("saturday").time.to_s.slice(0,10)+"T"+new_time
#     when 7
#         Chronic.parse("sunday").time.to_s.slice(0,10)+"T"+new_time
#     end
    
# end