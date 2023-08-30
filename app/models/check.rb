class Check < ApplicationRecord
    belongs_to :chore

    validates :approved, presence: :true
end
