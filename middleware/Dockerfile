#
# Copyright (C) 2017  Artur B.
#

FROM node:7

RUN mkdir -p /usr/src/app

# Copy & install app dependencies
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install

# http
EXPOSE 3000
# https 
EXPOSE 8000
CMD ["npm", "start"]
