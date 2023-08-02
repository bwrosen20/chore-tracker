class Chore < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_one :check
    belongs_to :user
    belongs_to :repeat_chore

    # validate :acceptable_image

    # def acceptable_image
    #     errors.add(:image, "can't be blank") unless image.attached?
    # end
end
