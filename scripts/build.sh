#!/bin/bash

args=()
if [ $NODE_ENV == 'development' ]
then
   args+=( '-w' );
fi


defaultRollupConfig=../../rollup.config.mjs
if [ -f ./rollup.config.mjs ]
then
  defaultRollupConfig=rollup.config.mjs
fi

# npx tsc --skipLibCheck --emitDeclarationOnly "${args[@]}" &
npx rollup -c "${defaultRollupConfig}" "${args[@]}"
