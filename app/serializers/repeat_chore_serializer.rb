class RepeatChoreSerializer < ActiveModel::Serializer
  attributes :id, :repeat_every, :cycle_between, :participants
end
