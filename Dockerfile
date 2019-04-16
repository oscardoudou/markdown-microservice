FROM ubuntu:16.04

RUN apt-get update
# Basics
RUN apt-get install -y build-essential git vim curl
RUN apt-get install -y npm
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

COPY . /srv
RUN cd /srv && npm install
ENV APP_PORT=3001
EXPOSE 3001

WORKDIR /srv