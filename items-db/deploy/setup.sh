#!/bin/bash
if [[ $1 != '' ]]
then
   if [[ $1 == 'prod' ]]
   then
      echo Setting up environment as Production...
      npm install
      mv node_modules environments/prod/node_modules
      cd environments/prod
      node initial-data.js
      node recipe-detailer.js
      cd ../..
   fi
   if [[ $1 == 'qa' ]]
   then
      echo Setting up project as QA...
   fi
   cp environments/$1/initial-data.json initial-data.json
   cp environments/$1/categories.json categories.json
   cp environments/$1/Dockerfile Dockerfile
   cp environments/$1/docker-compose.yml docker-compose.yml
else
echo no valid environment variable has been passed
fi
