# Package directories

PACKAGES := packages/config packages/cz-changelog packages/git-poule packages/gfx packages/intl packages/lib packages/markdown packages/media packages/playbook packages/sketch packages/style packages/ui packages/validation 

all:publish

publish:
	@for package in $(PACKAGES); do \
		echo "Publishing $$package"; \
		cd $$package && pnpm publish --registry http://localhost:4873; \
		cd -; \
	done
