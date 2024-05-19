#!/usr/bin/env bash

# Functions

postUser() {
  echo "Posting a new user..."
  curl -X POST \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "Jane Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
  echo "Posted new user: jane.doe@example.com"
}

getUser() {
  echo "Retrieving user information..."
  curl -X GET \
    "$URL/user?email=jane.doe@example.com" \
    -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
  echo "Retrieved user: jane.doe@example.com"
}

deleteUser() {
  echo "Deleting user..."
  curl -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }'
  echo "Deleted user: jane.doe@example.com"
}

putUser() {
  echo "Updating user information..."
  curl -X PUT \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "John Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }'
  echo "Updated user: jane.doe@example.com to John Doe"
}

getHealth() {
  echo "Checking health endpoint..."
  curl -X GET \
    "$URL/health"
  echo "Health check completed"
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
  echo "Posted new sample: Sample Name"
}

getSamples() {
  echo "Retrieving all samples..."
  curl -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
  echo "Retrieved all samples"
}

# Variables
URL="http://localhost:3000/api/v1"

# Testing

echo "Starting script..."

echo "Step 1: Delete user if exists"
deleteUser
sleep 1

echo "Step 2: Post new user"
postUser
sleep 1

echo "Step 3: Get user information"
getUser
sleep 1

echo "Step 4: Update user information"
putUser
sleep 1

echo "Step 5: Check health endpoint"
getHealth
sleep 1

echo "Step 6: Post new sample"
postSample
sleep 1

echo "Step 7: Get all samples"
getSamples

echo "Script finished."
