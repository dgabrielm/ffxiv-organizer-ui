#!/bin/bash
if [[ $1 != '' ]]
then
   if [[ $1 == 'prod' ]]
   then
      echo Cleaning up environment: Production
      rm environments/prod/initial-data.json
      rm environments/prod/categories.json
   fi
   if [[ $1 == 'qa' ]]
   then
      echo Cleaning up environment: QA
      sh deploy/purge-data.sh
   fi
   rm -rf data
   rm -rf environments/prod/node_modules
fi
rm Dockerfile docker-compose.yml initial-data.json categories.json
