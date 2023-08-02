class PrizeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :point_value, :updated_at, :image

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
  
end
