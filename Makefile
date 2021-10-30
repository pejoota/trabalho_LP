front:
	- PORT=3001 yarn --cwd ./front-end/ start 
#back:
#	- cd back-end/ && rails s 
setup-front:
	- yarn --cwd ./front-end/ install
#setup-back:
#	- cd back-end/ && bundle install
#	- cd back-end/ && rails db:create db:migrate
