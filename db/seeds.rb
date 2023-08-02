# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


puts"It's time to seed the data"

User.destroy_all
Chore.destroy_all
RepeatChore.destroy_all
Prize.destroy_all
RepeatPrize.destroy_all

mom=User.create(username:"Mom",email:"bwrosen20@gmail.com",password:"password",password_confirmation:"password",admin:true,group_name:"Rosen")

mom.profile_image.attach(io: File.open(Rails.root.join('db/images/mom.jpeg')),filename:'mom.jpeg')

adam=User.create(username:"Adam",email:"bwrosen20@gmail.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen")
brian=User.create(username:"Brian",email:"bwrosen20@gmail.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen")
brandon=User.create(username:"Brandon",email:"bwrosen20@gmail.com",password:"password",password_confirmation:"password",admin:false,group_name:"Rosen")

adam.profile_image.attach(io: File.open(Rails.root.join('db/images/pabloSanchez.jpeg')),filename:'pabloSanchez.jpeg')
brian.profile_image.attach(io: File.open(Rails.root.join('db/images/ronSwanson.jpeg')),filename:'ronSwanson.jpeg')
brandon.profile_image.attach(io: File.open(Rails.root.join('db/images/draco.jpeg')),filename:'draco.jpeg')

repeat_prize_token=RepeatPrize.create(title:"Any Single Prize",description:"Use this if you don't want to repeat",point_value:0,how_many_claims:100)
allowance=RepeatPrize.create(title:"$20 Allowance",description:"All three of you should be able to do enough to earn your allowance",point_value:20,how_many_claims:100)
disney=Prize.create(title:"Disney World", description:"We go to disney world",point_value:500,user_id:mom.id,repeat_prize_id:repeat_prize_token.id)
chilis=RepeatPrize.create(title:"Chilis", description:"Dinner at Chilis",point_value:50,how_many_claims:3)
dave=Prize.create(title:"Dave and Busters", description:"One night at Dave and Busters. You all get a $40 power card",point_value:100,user_id:mom.id,repeat_prize_id:repeat_prize_token.id)


allowance.image.attach(io: File.open(Rails.root.join('db/images/cash.jpeg')),filename:'cash.jpeg')
disney.image.attach(io: File.open(Rails.root.join('db/images/disney.jpeg')),filename:'disney.jpeg')
chilis.image.attach(io: File.open(Rails.root.join('db/images/chilis.jpeg')),filename:'chilis.jpeg')
dave.image.attach(io: File.open(Rails.root.join('db/images/davebusters.jpeg')),filename:'davebusters.jpeg')

repeat_chore_token=RepeatChore.create(title:"Any Single Chore",description:"Use this if you don't want to repeat",point_value:0,repeat_every:"never",which_users:nil)
clean=RepeatChore.create(title:"Clean your room",description:"Clean your room",point_value:20,repeat_every:"month",which_users:[adam.id,brian.id,brandon.id])
trash=RepeatChore.create(title:"Take out the trash",description:"Take the garbage out to the curb",point_value:10,repeat_every:["tuesday","friday"],which_users:[adam.id,brian.id])
plants=RepeatChore.create(title:"Water Plants",description:"Water all the plants in the kitchen",point_value:10,repeat_every:"week",which_users:brandon.id)
brians=Chore.create(title:"Set Table",description:"Set the dining room table for thanksgiving",point_value:15,completed:0,user_id:brian.id,repeat_chore_id:repeat_chore_token.id)
adams=Chore.create(title:"Grocery Shopping",description:"List: milk, eggs, bread, cheez its",point_value:15,completed:0,user_id:adam.id,repeat_chore_id:repeat_chore_token.id)
brandons=Chore.create(title:"Help dad change tire",description:"Go to garage at noon, dad needs help",point_value:20,completed:0,user_id:brandon.id,repeat_chore_id:repeat_chore_token.id)

clean.image.attach(io: File.open(Rails.root.join('db/images/broom.jpeg')),filename:'broom.jpeg')
trash.image.attach(io: File.open(Rails.root.join('db/images/trash.jpeg')),filename:'trash.jpeg')
plants.image.attach(io: File.open(Rails.root.join('db/images/plants.jpeg')),filename:'plants.jpeg')
brians.image.attach(io: File.open(Rails.root.join('db/images/tableSet.jpeg')),filename:'tableSet.jpeg')
adams.image.attach(io: File.open(Rails.root.join('db/images/groceries.jpeg')),filename:'groceries.jpeg')
brandons.image.attach(io: File.open(Rails.root.join('db/images/tire.jpeg')),filename:'tire.jpeg')

Check.create(comment:"Looks perfect",approved:true,chore_id:brians.id)
Check.create(comment:"Good job",approved:true,chore_id:adams.id)
Check.create(comment:"Dad had to do it himself",approved:false,chore_id:brandons.id)

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
