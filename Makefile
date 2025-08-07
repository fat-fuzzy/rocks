# Apps directories

APPS := apps/doc

# Package directories

PACKAGES := packages/config packages/cz-changelog packages/git-poule packages/gfx packages/intl packages/lib packages/markdown packages/media packages/playbook packages/sketch packages/style packages/ui packages/validation 

all:install

install:
	@for package in $(PACKAGES); do \
		echo "Installing dependencies for $$package"; \
		cd $$package && pnpm install --registry http://localhost:4873; \
		cd -; \
	done

	@for apps in $(APPS); do \
		echo "Installing dependencies for $$apps"; \
		cd $$apps && pnpm install --registry http://localhost:4873; \
		cd -; \
	done

all:publish

publish:
	@for package in $(PACKAGES); do \
		echo "Publishing $$package"; \
		cd $$package && pnpm publish --registry http://localhost:4873; \
		cd -; \
	done
