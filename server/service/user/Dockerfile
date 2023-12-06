FROM node:18.13.0

WORKDIR /usr/local/users

ENV PORT=4001

COPY package.json package-lock.json /usr/local/users/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]