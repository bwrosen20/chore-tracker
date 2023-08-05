class ChoreSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :completed, :point_value, :due_date, :updated_at, :image, :check, :kid, :repeat_every

  has_one :check

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def kid
    object.user.username
  end

  def repeat_every
    repeat = RepeatChore.find(object.repeat_chore_id)
    repeat.repeat_every
  end
end
