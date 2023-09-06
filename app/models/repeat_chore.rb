class RepeatChore < ApplicationRecord
    has_one_attached :image, dependent: :destroy

    has_many :chores
    has_many :users, through: :chores

    validates :title, presence: :true
    validates :description, presence: :true
    validates :point_value, numericality: {
        greater_than_or_equal_to: 1,
        less_than_or_equal_to: 100000
    }
    validates :repeat_every, presence: :true
    validates :due_date, presence: :true
    validates :participants, presence: :true
    validate :due_date_acceptable, on: :create
    # validate :acceptable_image


    def acceptable_image
        errors.add(:image, "can't be blank") unless image.attached?
    end
    
    def due_date_acceptable
        errors.add(:due_date, "must be future date") unless due_date && due_date > Time.now
    end
end
