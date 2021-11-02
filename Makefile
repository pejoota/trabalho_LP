front:
	- PORT=3001 yarn --cwd ./front-end/ start 
back:
	- cd api/ && go run main.go 
setup-front:
	- yarn --cwd ./front-end/ install

