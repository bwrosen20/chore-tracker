class Chore < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_one :check
    belongs_to :user
    belongs_to :repeat_chore
end
