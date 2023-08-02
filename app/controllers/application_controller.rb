class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_error
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorized
    
    private
  
    def authorized
      return render json: {errors: ["Unauthorized user"]}, status: :unauthorized unless session.include? :user_id
    end
  
    def render_unprocessable_entity_error(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
  
    def render_not_found_response
      render json: {errors: ["Cannot find object"]}, status: :not_found
    end
end
