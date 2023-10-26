class ChecksController < ApplicationController

    def create
        admin = User.find(session[:user_id])
        chore = Chore.find(params[:chore_id])
        repeat_chore = RepeatChore.find(chore.repeat_chore.id)
        participant = User.find(chore.user_id)
        if admin.admin
            if chore.check
                check = chore.check.update!(check_params)
            else
                check = Check.new(check_params)
                check.chore=chore
                check.save!
            end
            if params[:approved]=="approved"
                participant.points+=20
                chore.completed=1
                participant.save(validate: false)
                ChoreCheckedMailer.with(user: participant, chore: chore).chore_was_checked.deliver_now
            else
                chore.completed=0
            end
            chore.save(validate: false)


                unless chore.repeat_chore.repeat_every.include?"once" || chore.check.accepted=="rejected"        
                    time = chore.due_date
                    new_time = repeat_chore.due_date.to_s().slice(11,19)
                    if ["day","week","month"].include?(repeat_chore.repeat_every[0])
                        new_date = if repeat_chore.repeat_every[0]=="day"
                                        Chronic.parse("tomorrow", now:time).to_s.slice(0,10)+"T"+new_time

                                        # Chronic.parse('a week from now', now: Chronic.parse("tomorrow"))

                                    else 
                                        
                                        Chronic.parse("a #{repeat_chore.repeat_every[0]} from now", now:time).to_s.slice(0,10)+"T"+new_time


                                    end
            
                                
                    else
                        current_day = time.wday
                        day_array = ((repeat_chore.repeat_every).map{|day| day.to_i}).sort
                        next_chore_day = day_array.filter{|day|day>current_day}[0]? day_array.filter{|day|day>current_day}[0] : day_array[0]
                        new_date=case next_chore_day
                        when 1  
                            Chronic.parse("monday").to_s.slice(0,10)+"T"+new_time
                        when 2
                            Chronic.parse("tuesday").to_s.slice(0,10)+"T"+new_time
                        when 3
                            Chronic.parse("wednesday").to_s.slice(0,10)+"T"+new_time
                        when 4
                            Chronic.parse("thursday").to_s.slice(0,10)+"T"+new_time
                        when 5
                            Chronic.parse("friday").to_s.slice(0,10)+"T"+new_time
                        when 6
                            Chronic.parse("saturday").to_s.slice(0,10)+"T"+new_time
                        when 7
                            Chronic.parse("sunday").to_s.slice(0,10)+"T"+new_time
                        end
                        
                    end
                        

                    new_chore = repeat_chore.chores.new(
                        title:repeat_chore.title,
                        description:repeat_chore.description,
                        due_date:new_date,
                        point_value:repeat_chore.point_value,
                        completed:0
                    )
                    
                    if repeat_chore.participants.include?("upForGrabs") || repeat_chore.participants==[]
                       
                        new_chore.user=admin
                       
    
                    elsif repeat_chore.cycle_between
                        current_participant = chore.user.id
                        sorted_participants = ((repeat_chore.participants).map{|day| day.to_i}).sort
                        next_participant_id = sorted_participants.filter{|participant|participant>current_participant}[0]? sorted_participants.filter{|participant|participant>current_participant}[0] : sorted_participants[0] 
                        next_participant = User.find(next_participant_id)
                        new_chore.user=next_participant
    
                    else                     
                            new_chore.user=participant
        
                        end
                        new_chore.image.attach(repeat_chore.image.blob)
                        new_chore.save!
                    end
            if new_chore
                render json: [chore,new_chore], root: false
            else
                render json: chore
            end
        else
            render json: {errors: ["Unauthorized"]}
        end
    end

    private

    def check_params
        params.permit(:comment,:approved)
    end
end
