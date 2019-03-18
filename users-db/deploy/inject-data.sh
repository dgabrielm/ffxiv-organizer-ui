#!/bin/bash
mongoimport --db users --collection users --port 33111 --file initial-data.json --jsonArray
