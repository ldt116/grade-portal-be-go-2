# Sử dụng Node.js LTS (Long-Term Support) trên Alpine Linux
FROM node:19.5.0-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để cache dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Chạy ứng dụng ở chế độ phát triển (Next.js)
CMD ["npm", "start"]
