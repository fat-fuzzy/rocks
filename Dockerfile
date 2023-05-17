# Adapted from : https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:20-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

ARG PNPM_VERSION=8.3.1
RUN npm --global install pnpm@${PNPM_VERSION}
RUN npm --global install turbo
# Set working directory
WORKDIR /app
COPY . .
# Change scope to target a given web pachage
RUN pnpm turbo prune --scope=@fat-fuzzy/doc --docker

# Copy package.json and lockfile of isolated package
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
ARG PNPM_VERSION=8.3.1
RUN npm --global install pnpm@${PNPM_VERSION}
RUN npm --global install turbo
# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build

# Serve
FROM nginx:1.23.4-alpine
COPY --from=installer /app/apps/doc/build /usr/share/nginx/html
