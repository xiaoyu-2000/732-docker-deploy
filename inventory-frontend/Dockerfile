# 第一步：使用 Node 构建 React 应用
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 第二步：使用 Nginx 部署静态资源
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
