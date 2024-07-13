#!/usr/bin/env sh

heading() {
  LINE="$(printf "+-%s-+\n" "$(printf "%s" "$1" | sed 's/./-/g')")"

  printf "\033[90m"
  printf "%s\n" "$LINE"
  printf "| %s |\n" "$1"
  printf "%s\n" "$LINE"
  printf "\033[0m"
}
