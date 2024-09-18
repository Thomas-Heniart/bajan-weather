FROM node:20-bullseye
RUN apt update && apt-get install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libasound2 \
  libxrandr2 \
  libcups2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libgbm-dev \
  libatk-bridge2.0-0
WORKDIR /app
COPY --link ./ .
RUN SKIP_PREPARE=true npm install
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV COLLECT_WEATHER_ON_STARTUP=1
CMD ["node", "--enable-source-maps", "dist/src/main.js"]
