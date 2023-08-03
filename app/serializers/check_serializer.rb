class CheckSerializer < ActiveModel::Serializer
  attributes :id, :comment, :approved

  belongs_to :chore
end
