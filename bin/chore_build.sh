set -o errexit

bundle install
# bundle exec rake assets:precompile # These lines are commented out because we have an API only app
# bundle exec rake assets:clean
bundle rails db:migrate
bundle rails db:seed