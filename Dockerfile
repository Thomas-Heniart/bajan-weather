FROM node:20-alpine
WORKDIR /app
COPY --link ./ .
RUN SKIP_PREPARE=true npm install
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV COLLECT_WEATHER_ON_STARTUP=1
CMD ["node", "--enable-source-maps", "dist/src/main.js"]
