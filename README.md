<!--- Copyright (C) 2017  Artur B. -->
# **webshop: cap'n can** #

<!--- TODO: Desciribe Webshop-->
FYI: A commit should be start with an UpperCase and ends with a dot.

### Prerequirements ###
You need Docker and some other tools to run this project. First clone this
project and than run dockernode.sh to install Docker CE and Node.js on your
server:

```bash
# Change directory e.g to tmp, opt or to ~
cd ~
# Clone project
git clone git@gitlab.mi.hdm-stuttgart.de:ab176/cnc-shop.git
cd cnc-shop
# Start install script
./prereq/dockernode.sh
```

### Server Settings ###
You have to set your server IP-addr in some files for propor work.
Beside that you can also set bindings to localhost. 

```bash
# change localhost to your IP
hostname -i
vi frontend/protractor.conf.js
vi frontend/src/app/app.component.ts
```

### Start Container ###
To run all container which are linked together just hit the following in the
project root directory.

```bash
# build and run container
docker-compose build
docker-compose up
```

### Call website ###
You should now be able to use the webshop by open your browser and .........

### Author ###
(c) Artur B., Valdet D., Eli Kabasele, Kaan K.

### License ###
MIT

