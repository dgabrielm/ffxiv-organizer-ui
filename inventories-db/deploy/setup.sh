#!/bin/bash
if [[ $1 != '' ]]
then
   if [[ $1 == 'prod' ]]
   then
      echo Setting up environment as Production...
   fi
   if [[ $1 == 'qa' ]]
   then
      echo Setting up project as QA...
   fi
   cp environments/$1/Dockerfile Dockerfile
   cp environments/$1/docker-compose.yml docker-compose.yml
else
echo no valid environment variable has been passed
fi
