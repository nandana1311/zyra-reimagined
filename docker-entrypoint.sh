#!/bin/sh
set -e

# If node_modules is missing or empty in the mounted volume, install dependencies
if [ ! -d ./node_modules ] || [ -z "$(ls -A ./node_modules 2>/dev/null)" ]; then
  echo "node_modules not found — running npm ci to populate the volume"
  npm ci
fi

exec "$@"
