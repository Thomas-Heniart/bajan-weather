FROM node:20-bookworm
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
RUN npx remotion browser ensure
ENV NODE_ENV=production
CMD ["node", "--enable-source-maps", "./dist/src/weather-context/adapters/primaries/nest/scripts/launch.js"]
