#!/bin/bash
mongoimport --db items --collection items --port 33222 --file initial-data.json --jsonArray
mongoimport --db items --collection categories --port 33222 --file categories.json --jsonArray