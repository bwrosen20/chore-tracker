class RepeatChoreSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :point_value, :repeat_every, :cycle_between, :participants, :image

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end
