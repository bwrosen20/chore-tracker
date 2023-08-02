class User < ApplicationRecord
    has_one_attached :profile_image, dependent: :destroy
    has_secure_password

    has_many :prizes
    has_many :chores
    has_many :repeat_chores, through: :chores

    # validate :acceptable_image

    # def acceptable_image
    #     errors.add(:profile_image, "can't be blank") unless profile_image.attached?
    # end
end
