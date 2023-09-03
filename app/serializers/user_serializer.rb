class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :points, :username, :email, :admin, :chores, :prizes, :profile_image

  has_many :chores
  has_many :prizes
  has_many :repeat_chores

  def profile_image
    rails_blob_path(object.profile_image, only_path: true) if object.profile_image.attached?
  end

end
