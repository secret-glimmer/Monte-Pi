FROM node:alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 4173
CMD [ "yarn", "preview", "--host" ]
