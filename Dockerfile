# Adapted from : https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

ARG PNPM_VERSION=7.18.2
RUN npm --global install pnpm@${PNPM_VERSION}
RUN npm --global install turbo
# Set working directory
WORKDIR /app
COPY . .
# Change scope to target a given web pachage
RUN pnpm turbo prune --scope=@fat-fuzzy/doc --docker

# Copy package.json and lockfile of isolated package
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
ARG PNPM_VERSION=7.18.2
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

# FROM node:18-alpine AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 sveltekit
# USER sveltekit

# # Copy app source
# COPY --from=installer /app/apps/@fat-fuzzy/doc/svelte.config.js .
# COPY --from=installer /app/apps/@fat-fuzzy/doc/vite.config.js .
# COPY --from=installer /app/apps/@fat-fuzzy/doc/tsconfig.json .
# COPY --from=installer /app/apps/@fat-fuzzy/doc/package.json .

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/@fat-fuzzy/doc/advanced-features/output-file-tracing

# COPY --from=installer --chown=sveltekit:nodejs /app/apps/@fat-fuzzy/doc/.svelte-kit .
# # COPY --from=installer --chown=sveltekit:nodejs /app/apps/@fat-fuzzy/doc/static .


# CMD node build/index.js

FROM nginx:1.23.3-alpine
COPY --from=installer /app/apps/doc/build /usr/share/nginx/html

# COPY --from=installer /app/apps/doc/.svelte-kit/output/prerendered/pages /usr/share/nginx/html