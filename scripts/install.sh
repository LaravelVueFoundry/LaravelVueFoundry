#!/usr/bin/env sh

CURRENT_DIR=$(cd "$(dirname "$0")" || exit 1; pwd)
cd "$CURRENT_DIR/.." || exit 1

# shellcheck source=/dev/null
. scripts/common.sh

heading "Installing Laravel"
ddev exec composer install

heading "Installing Storybook"
cd storybook && pnpm install

heading "Installing main application"
ddev exec pnpm i
