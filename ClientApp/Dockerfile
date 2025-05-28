FROM node:18-alpine
WORKDIR /app/client
COPY ./client .
RUN npm install
RUN npm run build
# EXPOSE 3000
# CMD ["npm", "run", "build"]
# EXPOSE 3000
# CMD ["serve", "-s", "client/build", "-l", "3000"]