class UserSerializer < ActiveModel::Serializer
  attributes :id, :chores, :prizes, :points, :username, :email, :admin

  def chores
    object.chores.order(updated_at: :desc).limit(3)
  end

  def prizes
    object.prizes.order(updated_at: :desc).limit(3)
  end
end
