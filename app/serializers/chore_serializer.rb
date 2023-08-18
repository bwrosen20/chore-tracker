class ChoreSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :completed, :point_value, :due_date, :updated_at, :image, :repeat_chore, :check, :kid, :user_id

  has_one :check
  belongs_to :repeat_chore

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def kid
    object.user.username
  end

  private

  def find_repeat
    RepeatChore.find(object.repeat_chore_id)
  end
end
