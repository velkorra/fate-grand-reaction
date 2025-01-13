FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL ${REACT_APP_BACKEND_URL}
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html