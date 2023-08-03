class ChoreSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :completed, :point_value, :updated_at, :image, :check, :kid

  has_one :check

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def kid
    object.user.username
  end
end
