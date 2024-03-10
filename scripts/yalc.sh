#!/bin/bash

defaultRollupConfig=../../rollup.config.mjs
if [ -f ./rollup.config.mjs ]; then
  defaultRollupConfig=rollup.config.mjs
fi

command="
#  npx tsc --skipLibCheck --emitDeclarationOnly &
  npx rollup -c ${defaultRollupConfig};
  yalc push
"

echo $command

nodemon --watch src -x "${command}"
