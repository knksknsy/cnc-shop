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
./config/dockernode.sh
```

### Server Settings ###
In case of the message "Invalid Host Header" we currently use the
--disable-host-check flag till we setup a proxy.

Further we have X-OS Problems. Node-Sass has to be C-Compiled. So we 
need to rebuild this npm package for the dev PC/Server. A quick hack
to save time is compress the node-sass/ and extract it at the running system.
(It seems that the Problem is gone by adding node-sass to package.json!!!)

```bash
# Extract node-sass@4.5.3 into node_modules
tar xf ./config/node_sass.tar.xz -C ./frontend/
```

### Start Container ###
To run all container which are linked together just hit the following in the
project root directory.

```bash
# build and run container
docker-compose build
docker-compose up
```

### Server certificate ###
For the servers certificate we use dehydrated.....


### Call website ###
You should now be able to use the webshop by open your browser and .........

### Author ###
(c) Artur B., Valdet D., Eli Kabasele, Kaan K.

### License ###
MIT

