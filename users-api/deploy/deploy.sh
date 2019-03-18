#!/bin/bash
if [[ $1 != '' ]]
then
   sh deploy/reset.sh
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
else
   echo no valid environment variable has been passed
fi
