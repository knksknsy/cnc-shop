#!/bin/bash
#####################################################################
#
#            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
#                    Version 2, December 2004
#
#     Copyright (C) 2017  Artur B.
#
# Everyone is permitted to copy and distribute verbatim or modified
# copies of this license document, and changing it is allowed as long
# as the name is changed.
#
#            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
#   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
#
#  0. You just DO WHAT THE FUCK YOU WANT TO.
#
#####################################################################
RED='\033[0;31m' # Red Color
GREEN='\033[0;32m' # Green Color
CYAN='\033[0;36m' # Cyan Color
NC='\033[0m' # No Color

#
# Run as root
#
if [ "$EUID" -ne 0 ]
  then echo "${RED}Please run as sudor!${NC}"
  exit
fi

#
# Install Docker CE and Node for Debian:jessie@amd64
#

apt-get update && apt-get -y upgrade
#Get required packages
apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
#Get node .js and npm from source
curl -sL https://deb.nodesource.com/setup_7.x | bash -

#Install now node.js
apt-get install -y nodejs
#Add GPG Key
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
#Verify Key
#apt-key fingerprint 0EBFCD88

#Add Repo
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
#add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

#Update Repo and install Docker CE from Repo
apt-get update && apt-get -y install docker-ce
#Install Docker-Compose 1.13.0
curl -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

#Set permissions
chmod +x /usr/local/bin/docker-compose

#Docker Hello World Example
docker run --name hello hello-world
#View Docker Containers
docker ps -a
#Remove Hello World Example
echo -e "\n" && docker rmi -f hello-world
docker rm hello

#Enable Docker for non-root user
#usermod -aG docker <USERNAME>

#Install Angular CLI
#npm i -g @angular/cli

#View versionnumber
echo "node.js :"
node -v
echo "npm :"
npm -v
#echo "angularCLI :"
#ng -v
docker -v
docker-compose -v
