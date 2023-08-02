class User < ApplicationRecord
    has_one_attached :profile_image, dependent: :destroy
    has_secure_password

    has_many :chores
    has_many :prizes
    has_many :repeat_chores, through: :chores
end
