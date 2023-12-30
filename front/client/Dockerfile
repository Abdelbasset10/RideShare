FROM node AS client

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

RUN npm run build

EXPOSE 3001

RUN npm run start&
