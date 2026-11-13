#!/bin/sh
# Looks through every Python and JavaScript file for mistakes.
set -e
pip install -q pyflakes >/dev/null 2>&1 || true
python3 -m pyflakes $(git ls-files '*.py')
for f in $(git ls-files '*.js'); do node --check "$f"; done
echo "No errors found."
