class ChoreSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :completed, :point_value, :due_date, :updated_at, :image, :check, :kid, :repeat_every, :participants, :cycle_between

  has_one :check

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def kid
    object.user.username
  end

  def repeat_every
   find_repeat.repeat_every
  end

  def participants
    find_repeat.participants
  end 

  def cycle_between
    find_repeat.cycle_between  
  end

  private

  def find_repeat
    RepeatChore.find(object.repeat_chore_id)
  end
end
