#!/usr/bin/env bash

# Functions

postUser() {
  curl -X POST \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "Jane Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
}

getUser() {
  curl -X GET \
    "$URL/user?email=jane.doe@example.com" \
    -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
}

deleteUser() {
  curl -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }'
}

putUser() {
  curl -X PUT \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "John Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
}

getHealth() {
  curl -X GET \
    "$URL/health"
}

postSample() {
  curl -X POST \
    "$URL/samples" \
    -H 'Content-Type: application/json' \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{
      "name": "Sample Name",
      "description": "Sample Description"
    }'
}

getSamples() {
  curl -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
}

# Variables
URL="http://localhost:3000/api/v1"

# Testing

deleteUser
sleep 1
postUser
sleep 1
getUser
sleep 1
putUser
sleep 1
getHealth
sleep 1
postSample
sleep 1
getSamples