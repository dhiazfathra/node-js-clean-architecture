#!/usr/bin/env bash

# Functions

postUser() {
  echo "Posting a new user..."
  curl -X POST \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "Jane Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
  echo -e "\nPosted new user: jane.doe@example.com\n"
}

getUser() {
  echo "Retrieving user information..."
  curl -X GET \
    "$URL/user?email=jane.doe@example.com" \
    -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
  echo -e "\nRetrieved user: jane.doe@example.com\n"
}

deleteUser() {
  echo "Deleting user..."
  curl -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }'
  echo -e "\nDeleted user: jane.doe@example.com\n"
}

putUser() {
  echo "Updating user information..."
  curl -X PUT \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "John Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
  echo -e "\nUpdated user: jane.doe@example.com to John Doe\n"
}

getHealth() {
  echo "Checking health endpoint..."
  curl -X GET \
    "$URL/health"
  echo -e "\nHealth check completed\n"
}

postSample() {
  echo "Posting a new sample..."
  curl -X POST \
    "$URL/samples" \
    -H 'Content-Type: application/json' \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{
      "name": "Sample Name",
      "description": "Sample Description"
    }'
  echo -e "\nPosted new sample: Sample Name\n"
}

getSamples() {
  echo "Retrieving all samples..."
  curl -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
  echo -e "\nRetrieved all samples\n"
}

# Variables
URL="http://localhost:3000/api/v1"

# Testing

echo -e "\nStarting script...\n"

echo -e "\nStep 1: Delete user if exists\n"
deleteUser
sleep 1

echo -e "\nStep 2: Post new user\n"
postUser
sleep 1

echo -e "\nStep 3: Get user information\n"
getUser
sleep 1

echo -e "\nStep 4: Update user information\n"
putUser
sleep 1

echo -e "\nStep 5: Check health endpoint\n"
getHealth
sleep 1

echo -e "\nStep 6: Post new sample\n"
postSample
sleep 1

echo -e "\nStep 7: Get all samples\n"
getSamples

echo -e "\nScript finished.\n"
