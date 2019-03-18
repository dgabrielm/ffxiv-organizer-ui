#!/bin/bash
if [[ $1 != '' ]]
then
   if [[ $1 == 'prod' ]]
   then
      echo Cleaning up environment: Production
   fi
   if [[ $1 == 'qa' ]]
   then
      echo Cleaning up environment: QA
      sh deploy/purge-data.sh
      rm -rf data
   fi
fi
rm Dockerfile docker-compose.yml