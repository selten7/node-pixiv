NODE ?= node
ESLINT = $(NODE) ./node_modules/.bin/eslint

ESLINT_OPTS = \
	--config .eslintrc

FILES = \
	$(shell find . -type f -name '*.js' ! -path './node_modules/*')

eslint:
	$(ESLINT) $(ESLINT_OPTS) $(FILES)
.PHONY: eslint
