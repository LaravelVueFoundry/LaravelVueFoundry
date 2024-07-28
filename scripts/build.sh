#!/usr/bin/env sh

CURRENT_DIR=$(cd "$(dirname "$0")" || exit 1; pwd)
cd "$CURRENT_DIR/.." || exit 1

# shellcheck source=/dev/null
. scripts/common.sh

heading "Building Storybook"
cd storybook && pnpm build && cd ..

heading "Building main application"
ddev exec pnpm build
