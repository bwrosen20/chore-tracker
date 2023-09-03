class Chore < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_one :check
    belongs_to :user
    belongs_to :repeat_chore

    validates :title, presence: :true, on: [:create,:update]
    validates :description, presence: :true, on: [:create,:update]
    validates :point_value, numericality: {
        greater_than_or_equal_to: 1,
        less_than_or_equal_to: 10000
    }, on: [:create,:update]
    validate :due_date_acceptable, on: [:create,:update]
    validate :acceptable_image, on: :create
    

    def acceptable_image
        errors.add(:image, "can't be blank") unless image.attached?
    end

    def due_date_acceptable
        errors.add(:due_date, "must be future date") unless due_date > Time.now
    end
end
