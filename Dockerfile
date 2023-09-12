FROM node:17 as react-build

WORKDIR /app

COPY package*.json ./

RUN npm install -f

COPY . .

RUN npm run build  


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=react-build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx","-g","daemon off;"]
