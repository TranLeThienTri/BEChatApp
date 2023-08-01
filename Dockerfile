# Sử dụng một hình ảnh Node.js để xây dựng ứng dụng NestJS
FROM node:18
# Tạo thư mục ứng dụng trong container
WORKDIR /app

# Sao chép các file package.json và yarn.lock vào thư mục /app trong container
COPY package.json yarn.lock ./

# Cài đặt dependencies của ứng dụng bằng yarn
RUN yarn install

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục /app trong container
COPY . .

# Build ứng dụng NestJS
RUN yarn build

EXPOSE 5000

# Tiến hành khởi động ứng dụng khi container được chạy
CMD ["yarn", "start:dev"]
