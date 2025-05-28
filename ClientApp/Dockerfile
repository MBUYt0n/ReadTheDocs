FROM node:18-alpine
WORKDIR /app/client
COPY ./client .
RUN npm install
RUN npm run build

# FROM node:18-alpine
# WORKDIR /app
# RUN npm install -g vite@latest
# RUN npm create vite@latest client -- --template react
# WORKDIR /app/client
# RUN npm install
# RUN npm install react react-dom react-router-dom
# CMD ["npm", "run", "dev"]