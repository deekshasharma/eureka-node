#FROM ubuntu:16.04
#
#RUN apt-get update && apt-get install -y xz-utils npm unzip wget zip ca-certificates curl
#
#ENV NODE_VERSION 6.2.2
#
#ENV NODE_DOWNLOAD https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz
#ENV NODE_SHA256_DOWNLOAD https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt
#
#RUN mkdir -pv /nodejs/apps
#WORKDIR /nodejs/apps
#
#ADD package.json /nodejs/apps
#RUN npm install
#
#RUN curl -SLO $NODE_DOWNLOAD && \
#    curl -SLO $NODE_SHA256_DOWNLOAD && \
#    grep node-v$NODE_VERSION-linux-x64.tar.xz SHASUMS256.txt | sha256sum -c - && \
#    tar -xJf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 &&\
#    rm node-v$NODE_VERSION-linux-x64.tar.xz SHASUMS256.txt
#
#ADD . /nodejs/apps
#RUN ls
#
#EXPOSE 9999
#
#CMD ["npm", "start"]

# Below code in the docker file is specifically for cases when npm registry is already updated for external dependencies. npm install command not required.

FROM ubuntu:16.04

RUN apt-get update && apt-get install -y xz-utils npm unzip wget zip ca-certificates curl

ENV NODE_VERSION 6.2.2

ENV NODE_DOWNLOAD https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz
ENV NODE_SHA256_DOWNLOAD https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt

RUN mkdir -pv /nodejs/apps
WORKDIR /nodejs/apps

RUN curl -SLO $NODE_DOWNLOAD && \
    curl -SLO $NODE_SHA256_DOWNLOAD && \
    grep node-v$NODE_VERSION-linux-x64.tar.xz SHASUMS256.txt | sha256sum -c - && \
    tar -xJf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 &&\
    rm node-v$NODE_VERSION-linux-x64.tar.xz SHASUMS256.txt

EXPOSE 9999

CMD ["node", "server.js"]

