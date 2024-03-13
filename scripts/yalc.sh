#!/bin/bash

defaultRollupConfig=../../rollup.config.mjs
if [ -f ./rollup.config.mjs ]; then
  defaultRollupConfig=rollup.config.mjs
fi

command="
  npx rollup -c ${defaultRollupConfig};
  yalc push
"

echo $command

nodemon --watch src -x "${command}"
