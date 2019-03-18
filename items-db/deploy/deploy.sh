#!/bin/bash
if [[ $1 != '' ]]
then
   sh deploy/reset.sh $1
   sh deploy/setup.sh $1
   if [[ $1 == 'prod' ]]
   then
      echo Starting Production environment...
   fi
   if [[ $1 == 'qa' ]]
   then
      echo Starting QA environment...
   fi
   docker-compose build
   docker-compose up &
   docker-compose start
   sleep 10
   sh deploy/inject-data.sh
else
   echo no valid environment variable has been passed
fi
