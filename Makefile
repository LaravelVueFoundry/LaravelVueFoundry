.PHONY: install build dev storybook lint test start test-storybook

export PATH := $(PATH)

default: build

_pnpm:
	@which pnpm || corepack enable

install: _pnpm
	@scripts/install.sh

build: _pnpm
	@scripts/build.sh

dev: _pnpm
	@ddev exec pnpm dev

storybook: _pnpm
	@cd storybook && pnpm storybook

lint: _pnpm
	@ddev pint --test
	@pnpm lint

test:
	@ddev test

start:
	@ddev pnpm start

test-storybook: _pnpm
	@cd storybook && pnpm test
