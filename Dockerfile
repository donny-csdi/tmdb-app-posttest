# stage 1: build from official docker hub node.js images
FROM node:lts-alpine as build

# set the working directory
WORKDIR /app

# copy the package.json and package-lock.json
COPY package*.json ./

# install the depedencies
RUN npm install

# add arguments
ARG NEXT_PUBLIC_TMDB_API_KEY

# store value to arg
ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY

# copy the rest of the application code
COPY . .

# build app
RUN npm run build

# expose port 3000
EXPOSE 3000

# start app
CMD [ "npm", "start"]