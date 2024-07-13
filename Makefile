.PHONY: install build dev storybook lint test-storybook

export PATH := $(PATH)

default: build

_pnpm:
	@which pnpm || corepack enable

install: _pnpm
	@scripts/install.sh

build: _pnpm
	@scripts/build.sh

dev:
	@ddev exec pnpm dev

storybook:
	@cd storybook && pnpm storybook

lint: _pnpm
	@pnpm lint

test-storybook: _pnpm
	@cd storybook && pnpm test
