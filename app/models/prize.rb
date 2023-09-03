class Prize < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    belongs_to :user
    belongs_to :repeat_prize

    validates :title, presence: :true
    validates :description, presence: :true
    validates :point_value, numericality: {
        greater_than_or_equal_to:1,
        less_than_or_equal_to:10000
    }
    validate :acceptable_image

    def acceptable_image
        errors.add(:image, "can't be blank") unless image.attached?
    end
end
