class Prize < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    belongs_to :user
    belongs_to :repeat_prize
end
