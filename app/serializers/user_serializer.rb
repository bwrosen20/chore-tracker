class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :points, :username, :email, :admin, :chores, :prizes, :profile_image

  has_many :chores
  has_many :prizes

  # def chores
  #   object.chores.order(updated_at: :desc).limit(3)
  # end

  # def prizes
  #   object.prizes.order(updated_at: :desc).limit(3)
  # end

  def profile_image
    rails_blob_path(object.profile_image, only_path: true) if object.profile_image.attached?
  end

  
end
