# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or newd alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.new([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.new(name: "Luke", movie: movies.first)


puts"It's time to seed the data"

User.destroy_all
Chore.destroy_all
RepeatChore.destroy_all
Prize.destroy_all
RepeatPrize.destroy_all
Check.destroy_all

mom=User.new(username:"Mom",email:"bwrosen20@gmail.com",password:"password",password_confirmation:"password",admin:true,group_name:"Rosen",points:0)

mom.profile_image.attach(io: File.open(Rails.root.join('db/images/mom.jpeg')),filename:'mom.jpeg')

adam=User.new(username:"Adam",email:"brianrosen20@yahoo.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen",points:0)
brian=User.new(username:"Brian",email:"brianrosen20@aol.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen",points:0)
brandon=User.new(username:"Brandon",email:"bwrosen20@icloud.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen",points:500)

adam.profile_image.attach(io: File.open(Rails.root.join('db/images/pabloSanchez.jpeg')),filename:'pabloSanchez.jpeg')
brian.profile_image.attach(io: File.open(Rails.root.join('db/images/ronSwanson.jpeg')),filename:'ronSwanson.jpeg')
brandon.profile_image.attach(io: File.open(Rails.root.join('db/images/draco.jpeg')),filename:'draco.jpeg')

mom.save!
adam.save!
brian.save!
brandon.save!


repeat_prize_token=RepeatPrize.new(title:"Any Single Prize",description:"Use this if you don't want to repeat",point_value:1,how_many_claims:1)
repeat_prize_token.image.attach(io: File.open(Rails.root.join('db/images/cash.jpeg')),filename:'cash.jpeg')
repeat_prize_token.save!

allowance=RepeatPrize.new(title:"$20 Allowance",description:"All three of you should be able to do enough to earn your allowance",point_value:20,how_many_claims:100)
    allowance.image.attach(io: File.open(Rails.root.join('db/images/cash.jpeg')),filename:'cash.jpeg')
    allowance.save!


    allowance_one=Prize.new(title:"$20 Allowance", description:"All three of you should be able to do enough to earn your allowance",point_value:20,user_id:mom.id,repeat_prize_id:allowance.id)
    disney=Prize.new(title:"Disney World", description:"We go to disney world",point_value:500,user_id:mom.id,repeat_prize_id:repeat_prize_token.id)
chilis=RepeatPrize.new(title:"Chilis", description:"Dinner at Chilis",point_value:50,how_many_claims:3)
    chilis.image.attach(io: File.open(Rails.root.join('db/images/chilis.jpeg')),filename:'chilis.jpeg')
    chilis.save!


    chilis_one=Prize.new(title:"Chilis", description:"Dinner at Chilis",point_value:50,user_id:mom.id,repeat_prize_id:chilis.id)
dave=Prize.new(title:"Dave and Busters", description:"One night at Dave and Busters. You all get a $40 power card",point_value:100,user_id:mom.id,repeat_prize_id:repeat_prize_token.id)



    allowance_one.image.attach(io: File.open(Rails.root.join('db/images/cash.jpeg')),filename:'cash.jpeg')
disney.image.attach(io: File.open(Rails.root.join('db/images/disney.jpeg')),filename:'disney.jpeg')
    chilis_one.image.attach(io: File.open(Rails.root.join('db/images/chilis.jpeg')),filename:'chilis.jpeg')
dave.image.attach(io: File.open(Rails.root.join('db/images/davebusters.jpeg')),filename:'davebusters.jpeg')



allowance_one.save!
disney.save!
chilis_one.save!
dave.save!

repeat_chore_token=RepeatChore.new(title:"Do not repeat",description:"Use this if you don't want to repeat",point_value:1,repeat_every:["once"],due_date:"2023-10-20T18:45 -0400",participants:["upForGrabs"])
repeat_chore_token.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')
repeat_chore_token.save!

clean=RepeatChore.new(title:"Clean your room",description:"Clean your room",point_value:20,repeat_every:["month"],cycle_between:false,participants:[(adam.id),(brian.id),(brandon.id)],due_date:"2023-10-20T18:45 -0400")
clean.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')
clean.save!

    brians_room=Chore.new(title:"Clean your room",description:"Clean your room",point_value:20,completed:1,user_id:brian.id,repeat_chore_id:clean.id,due_date:"2023-10-20T18:45 -0400")
    adams_room=Chore.new(title:"Clean your room",description:"Clean your room",point_value:20,completed:0,user_id:adam.id,repeat_chore_id:clean.id,due_date:"2023-10-20T18:45 -0400")
    brandons_room=Chore.new(title:"Clean your room",description:"Clean your room",point_value:20,completed:1,user_id:brandon.id,repeat_chore_id:clean.id,due_date:"2023-10-20T18:45 -0400")
trash=RepeatChore.new(title:"Take out the trash",description:"Take the garbage out to the curb",point_value:10,repeat_every:[2,5],cycle_between:true,participants:[(adam.id),(brian.id)],due_date:"2023-10-20T18:45 -0400")
trash.image.attach(io: File.open(Rails.root.join('db/images/trash.jpeg')),filename:'trash.jpeg')
trash.save!

    trash_one=Chore.new(title:"Take out trash",description:"Take out the trash",point_value:10,completed:0,user_id:mom.id,repeat_chore_id:trash.id,due_date:"2023-10-20T18:45 -0400")
plants=RepeatChore.new(title:"Water Plants",description:"Water all the plants in the kitchen",point_value:10,repeat_every:["week"],cycle_between:false,participants:[(brandon.id)],due_date:"2023-10-20T18:45 -0400")
plants.image.attach(io: File.open(Rails.root.join('db/images/plants.jpeg')),filename:'plants.jpeg')
plants.save!

    plants_one=Chore.new(title:"Water Plants",description:"Water all the plants in the kitchen",point_value:10,completed:1,user_id:brandon.id,repeat_chore_id:plants.id,due_date:"2023-10-20T18:45 -0400")
brians=Chore.new(title:"Set Table",description:"Set the dining room table",point_value:15,completed:1,user_id:brian.id,repeat_chore_id:repeat_chore_token.id,due_date:"2023-10-20T18:45 -0400")
adams=Chore.new(title:"Grocery Shopping",description:"List: milk, eggs, bread, cheez its",point_value:15,completed:1,user_id:adam.id,repeat_chore_id:repeat_chore_token.id,due_date:"2023-10-24T10:00 -0400")
brandons=Chore.new(title:"Help dad change tire",description:"Go to garage at noon, dad needs help",point_value:20,completed:0,user_id:brandon.id,repeat_chore_id:repeat_chore_token.id,due_date:"2023-10-20T10:30 -0400")
        extra_chore=Chore.new(title:"Clean Garage",description:"Reorganize and vacuum the garage",point_value:75,completed:0,user_id:mom.id,repeat_chore_id:repeat_chore_token.id,due_date:"2023-10-31T20:00 -0400")



    brians_room.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')
    adams_room.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')
    brandons_room.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')

    trash_one.image.attach(io: File.open(Rails.root.join('db/images/trash.jpeg')),filename:'trash.jpeg')
plants.image.attach(io: File.open(Rails.root.join('db/images/plants.jpeg')),filename:'plants.jpeg')
    plants_one.image.attach(io: File.open(Rails.root.join('db/images/plants.jpeg')),filename:'plants.jpeg')
brians.image.attach(io: File.open(Rails.root.join('db/images/tableSet.jpeg')),filename:'tableSet.jpeg')
adams.image.attach(io: File.open(Rails.root.join('db/images/groceries.jpeg')),filename:'groceries.jpeg')
brandons.image.attach(io: File.open(Rails.root.join('db/images/tire.jpeg')),filename:'tire.jpeg')
extra_chore.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')


brians_room.save!
adams_room.save!
brandons_room.save!

trash_one.save!

plants_one.save!
brians.save!
adams.save!
brandons.save!
extra_chore.save!

Check.new(comment:"Looks perfect",approved:"approved",chore_id:brians.id)
Check.new(comment:"Good job",approved:"approved",chore_id:adams.id)
Check.new(comment:"Dad had to do it himself",approved:"rejected",chore_id:brandons.id)
Check.new(comment:"Looks amazing",approved:"approved",chore_id:brians_room.id)
Check.new(comment:"Wow, even better than I expected",approved:"approved",chore_id:brandons_room.id)
Check.new(comment:"Nice and watery",approved:"approved",chore_id:plants_one.id)

puts"The data has been seeded"


#user
# t.string :username
# t.string :email
# t.string :password_digest
# t.boolean :admin
# t.string :group_name

#repeat_prize
# t.string :title
# t.text :description
# t.integer :point_value
# t.boolean :how_many_claims


#prize
# t.string :title
# t.text :description
# t.integer :point_value
# t.integer :user_id
# t.integer :repeat_prize

#chore
# t.string :title
# t.text :description
# t.boolean :completed
# t.integer :point_value
# t.integer :user_id
# t.integer :repeat_chore_id

#repeat_chore
# t.string :title
# t.text :description
# t.integer :point_value
# t.string :repeat_every

#check
# t.string :comment
# t.integer :approved
# t.integer :chore_id
