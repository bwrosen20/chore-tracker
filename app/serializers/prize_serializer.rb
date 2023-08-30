class PrizeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :point_value, :updated_at, :how_many_claims, :image

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def how_many_claims
    repeat_prize = RepeatPrize.find(object.repeat_prize.id)
    repeat_prize.how_many_claims
  end
  
end
