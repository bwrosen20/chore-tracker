class PrizeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :point_value, :updated_at, :how_many_claims, :awarded, :kid, :user_id, :image

  belongs_to :repeat_prize

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def how_many_claims
    repeat_prize = RepeatPrize.find(object.repeat_prize.id)
    repeat_prize.how_many_claims
  end

  def kid
    User.find(object.user.id).username
  end
  
end
