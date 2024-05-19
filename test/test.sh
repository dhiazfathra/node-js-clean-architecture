#!/usr/bin/env bash

# Functions

postUser() {
  echo "Posting a new user..."
  response=$(curl -s -X POST \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "Jane Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }')
  echo "$response"
  if [[ "$response" == *'"status":"Created"'* ]]; then
    echo -e "\nPosted new user: jane.doe@example.com - SUCCESS\n"
  else
    echo -e "\nFailed to post new user: jane.doe@example.com - FAILURE\n"
  fi
}

getUser() {
  echo "Retrieving user information..."
  response=$(curl -s -X GET \
    "$URL/user?email=jane.doe@example.com" \
    -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=')
  echo "$response"
  if [[ "$response" == *'"email":"jane.doe@example.com"'* ]]; then
    echo -e "\nRetrieved user: jane.doe@example.com - SUCCESS\n"
  else
    echo -e "\nFailed to retrieve user: jane.doe@example.com - FAILURE\n"
  fi
}

deleteUser() {
  echo "Deleting user..."
  response=$(curl -s -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }')
  echo "$response"
  if [[ "$response" == *'"status":"No Content"'* || "$response" == *'"status":"Not Found"'* ]]; then
    echo -e "\nDeleted user: jane.doe@example.com - SUCCESS\n"
  else
    echo -e "\nFailed to delete user: jane.doe@example.com - FAILURE\n"
  fi
}

putUser() {
  echo "Updating user information..."
  response=$(curl -s -X PUT \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "John Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }')
  echo "$response"
  if [[ "$response" == *'"status":"OK"'* ]]; then
    echo -e "\nUpdated user: jane.doe@example.com to John Doe - SUCCESS\n"
  else
    echo -e "\nFailed to update user: jane.doe@example.com - FAILURE\n"
  fi
}

getHealth() {
  echo "Checking health endpoint..."
  response=$(curl -s -X GET \
    "$URL/health")
  echo "$response"
  if [[ "$response" == *'"message":"OK"'* ]]; then
    echo -e "\nHealth check completed - SUCCESS\n"
  else
    echo -e "\nHealth check failed - FAILURE\n"
  fi
}

postSample() {
  echo "Posting a new sample..."
  response=$(curl -s -X POST \
    "$URL/samples" \
    -H 'Content-Type: application/json' \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{
      "name": "Sample Name",
      "description": "Sample Description"
    }')
  echo "$response"
  if [[ "$response" == *'"status":"OK"'* ]]; then
    echo -e "\nPosted new sample: Sample Name - SUCCESS\n"
  else
    echo -e "\nFailed to post new sample: Sample Name - FAILURE\n"
  fi
}

getSamples() {
  echo "Retrieving all samples..."
  response=$(curl -s -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=')
  echo "$response"
  if [[ "$response" == *'["_id"'* ]]; then
    echo -e "\nRetrieved all samples - SUCCESS\n"
  else
    echo -e "\nFailed to retrieve samples - FAILURE\n"
  fi
}

# Variables
URL="http://localhost:3000/api/v1"

# Testing

echo -e "\nStarting script...\n"

echo -e "\nStep 1: Delete user if exists\n"
deleteUser
sleep 1

echo -e "\n\nStep 2: Post new user\n"
postUser
sleep 1

echo -e "\n\nStep 3: Get user information\n"
getUser
sleep 1

echo -e "\n\nStep 4: Update user information\n"
putUser
sleep 1

echo -e "\n\nStep 5: Check health endpoint\n"
getHealth
sleep 1

echo -e "\n\nStep 6: Post new sample\n"
postSample
sleep 1

echo -e "\n\nStep 7: Get all samples\n"
getSamples


echo -e "\n\nClean up: Delete user if exists\n"
deleteUser
sleep 1

echo -e "\nScript finished.\n"
