class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :points, :username, :email, :admin, :chores, :prizes, :user_repeat_chores, :profile_image

  has_many :chores
  has_many :prizes

  def profile_image
    rails_blob_path(object.profile_image, only_path: true) if object.profile_image.attached?
  end

  def user_repeat_chores
    array = RepeatChore.all.filter{|chore|(chore.participants.include?(object.id.to_s))}
    # array.map{|chore|chore.merge(image:chore.image)}
  end
  
end
