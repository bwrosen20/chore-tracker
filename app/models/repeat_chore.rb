class RepeatChore < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_many :chores
end
