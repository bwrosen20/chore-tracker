class Prize < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    belongs_to :user
    belongs_to :repeat_prize

    # validate :acceptable_image

    # def acceptable_image
    #     errors.add(:image, "can't be blank") unless image.attached?
    # end
end
