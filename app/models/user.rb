class User < ApplicationRecord
    has_one_attached :profile_image, dependent: :destroy
    has_secure_password

    has_many :prizes
    has_many :chores
    has_many :repeat_chores, through: :chores

    validates :username, presence: :true
    validates :email, uniqueness: true
    validates :password, confirmation: true
    validates :password, presence: :true, confirmation: true, on: :create
    validates :password, length: {minimum: 6}, confirmation: true, on: :create
    validate :email_check

    validate :acceptable_image

    def acceptable_image
        errors.add(:profile_image, "can't be blank") unless profile_image.attached?
    end

    def email_check
        errors.add(:email, "must be valid") unless (email.include?("@") && (email.include?(".")))
    end 
end
