FROM node:12

WORKDIR /client

ENV PATH /app/node_modules/.bin:$PATH 

COPY package.json ./
# COPY package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 3000

# RUN npm run build /use this whe deploying

CMD ["npm", "start"]