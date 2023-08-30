class RepeatPrize < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_many :prizes

    validates :title, presence: :true
    validates :description, presence: :true
    validates :point_value, numericality: {
        greater_than_or_equal_to:1
    }
    validates :how_many_claims, presence: :true
    validate :acceptable_image

    def acceptable_image
        errors.add(:image, "can't be blank") unless image.attached?
    end
end
