#
# Copyright (C) 2017  Artur B.
#

FROM node:7

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy & install app dependencies
COPY . /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 4200
CMD ["npm", "start"]
