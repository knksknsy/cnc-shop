# **webshop: cap'n can** #

### Prerequirements ###
You need Docker and some other tools to run a production server for this project. First clone this project and than run dockernode.sh to install Docker CE and Node.js on your
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

protractor.conf.js > baseUrl: 'http://<IP>:4200/',
src/app/services/authentication.service.ts  > API = 'https://<IP>:8000';
src/app/services/category.service.ts  > API = 'https://<IP>:8000';
src/app/services/color.service.ts  > API = 'https://<IP>:8000';
src/app/services/products.service.ts  > API = 'https://<IP>:8000';
src/app/resolver/order-history-resolver.service  > API = 'https://<IP>:8000';


## Production server

Run `docker-compose up` on your remote machine for an production server.


## Development server

Run `ng serve` in the frontend directory on your local machine for an dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
In the middleware directory start the express server with `node server.js`.
You also need da database, so call `mongod`.

Make sure to populate the database before starting the development server. For this purpose you can find a postman collection in /middleware/postman/Cap'n Can.postman_collection.json.

Import this file to your postman and call the /add endpoints in this order:
* categories/categories/add
* colors/colors/add
* products/products/add


### Further notes ###
In case of the message "Invalid Host Header" we currently use the
--disable-host-check flag till we setup a proxy.

Further we have X-OS Problems. Node-Sass has to be C-Compiled. So we
need to rebuild this npm package for the devServer/remoteServer. A quick hack
to save time is compress the node-sass/ and extract it at the running system.
Mount it via volumes, or just execute `npm rebuild node-sass --force`.

```bash
# Check the container ID for the frontend container
docker ps -a
# Next we can enter the running container with
docker exec -it <CONTAINERID/NAME> /bin/bash
```


### Author ###
(c) Artur B., Valdet D., Eli Kabasele, Kaan K.

### License ###
MIT
