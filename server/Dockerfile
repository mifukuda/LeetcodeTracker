FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN apk add chromium
RUN npm i
RUN node node_modules/puppeteer/install.js 
CMD ["node", "index.js"]