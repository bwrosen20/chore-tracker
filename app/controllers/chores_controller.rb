class ChoresController < ApplicationController
    skip_before_action :authorized, only: :index

    def index
        chores = Chore.all
        render json: chores
    end

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
            render json: {errors: ["Unauthorized"]}
        end
        render json: chore, status: :created
    end

    def update
        admin = User.find(session[:user_id])
        if admin.admin
            user = User.find(params[:participant])
            chore = Chore.find(params[:id])
            original_user = User.find(chore.user_id)
            chore.update(chore_params)
            chore.user=user
            chore.save!
           
            render json: chore
        else
            render json: {errors: ["Unauthorized"]}
        end 
    end

    def claim
        user = User.find(session[:user_id])
        chore = Chore.find(params[:chore_id])
        chore.user = user
        chore.save!
        render json: chore
    end

    def finished
        user = User.find(session[:user_id])
        chore = Chore.find(params[:chore_id])
        if chore.check
            check = chore.check
            chore.check.approved="pending"
            check.save!
        end
        chore.completed=1
        chore.save!
        render json: chore
    end

    def destroy
        user = User.find(session[:user_id])
        if user.admin
            chore = Chore.find(params[:id])
            chore.destroy

            head :no_content
        end

    end

    private

    def chore_params
        params.permit(:title, :description, :due_date, :image, :point_value)
    end

    def repeat_chore_params
        params.permit(:title, :description, :image, :point_value, :cycle_between, :repeat_every=>[], :participants=>[])
    end
end


# Time.now.strftime("%Y-%d-%m %H:%M:%S %Z")


# if params[:token]=="all"
#     unless repeat_chore.title=="Do not repeat"
#         repeat_chore.destroy
#     end
# else
#     time = Time.now
#     Time.zone="UTC"
#     Chronic.time_class=Time.zone
#     new_time = chore.due_date.time.strftime("%H:%M:%S")
#     if ["day","week","month"].include?(repeat_chore.repeat_every[0])
#         new_date = if repeat_chore.repeat_every[0]=="day"
#                         Chronic.parse("tomorrow #{new_time}")
#                     else
#                         Chronic.parse("next #{repeat_chore.repeat_every[0]} #{new_time}")
#                     end
                   
#     elsif !repeat_chore.repeat_every.include?("once")
#         current_day = time.wday
#         day_array = ((repeat_chore.repeat_every).map{|day| day.to_i}).sort
#         next_chore_day = day_array.filter{|day|day>current_day}[0]? day_array.filter{|day|day>current_day}[0] : day_array[0]
#         new_date=case next_chore_day
#         when 1  
#             Chronic.parse("monday #{new_time}")
#         when 2
#             Chronic.parse("tuesday #{new_time}")
#         when 3
#             Chronic.parse("wednesday #{new_time}")
#         when 4
#             Chronic.parse("thursday #{new_time}")
#         when 5
#             Chronic.parse("friday #{new_time}")
#         when 6
#             Chronic.parse("saturday #{new_time}")
#         when 7
#             Chronic.parse("sunday #{new_time}")
#         end
        
    
#         new_chore = repeat_chore.chores.new(
#             title:repeat_chore.title,
#             description:repeat_chore.description,
#             due_date:new_date,
#             point_value:repeat_chore.point_value,
#             completed:false
#         )

#         if repeat_chore.participants.include?("upForGrabs") || repeat_chore.participants==[]
#             new_chore.user=user

#         elsif repeat_chore.cycle_between
#             current_participant = chore.user_id
#             participant_array = ((repeat_chore.participants).map{|participant|participant.to_i}).sort
#             next_participant_id = participant_array.filter{|participant|participant>current_participant}[0]? participant_array.filter{|participant|participant>current_participant}[0] : participant_array[0]
#             next_participant = User.find(next_participant_id)
#             new_chore.user=next_participant
#         else
#             new_chore.user=chore.user
#         end
        
#         new_chore.image.attach(repeat_chore.image.blob)
#         new_chore.save!
#     end
# end




# repeat_chore = RepeatChore.find(chore.repeat_chore_id)
# if repeat_chore.title=="Do not repeat"
#     if params[:repeat_every]!="once"
#         new_repeat = RepeatChore.create!(repeat_chore_params)
#         chore.repeat_chore = new_repeat
#         chore.save!
#     end
# else
#     repeat_chore.update!(repeat_chore_params)
# end