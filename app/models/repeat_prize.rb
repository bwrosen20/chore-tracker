class RepeatPrize < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_many :prizes
end
