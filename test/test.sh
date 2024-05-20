#!/usr/bin/env bash

# Variables for counting successes and failures
total_tests=0
tests_succeeded=0
tests_failed=0

# Functions

increment_success() {
  ((total_tests++))
  ((tests_succeeded++))
}

increment_failure() {
  ((total_tests++))
  ((tests_failed++))
}

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
    increment_success
  else
    echo -e "\nFailed to post new user: jane.doe@example.com - FAILURE\n"
    increment_failure
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
    increment_success
  else
    echo -e "\nFailed to retrieve user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

deleteUser() {
  echo "Deleting user..."
  response=$(curl -s -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }')
  
  if [[ -z "$response" || "$response" == *'"status":"No Content"'* || "$response" == *'"status":"Not Found"'* || "$response" == *'"message":"User deleted"'* ]]; then
    echo -e "\nDeleted user: jane.doe@example.com - SUCCESS\n"
    increment_success
  else
    echo "$response"
    echo -e "\nFailed to delete user: jane.doe@example.com - FAILURE\n"
    increment_failure
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
    increment_success
  else
    echo -e "\nFailed to update user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

getHealth() {
  echo "Checking health endpoint..."
  response=$(curl -s -X GET \
    "$URL/health")
  echo "$response"
  if [[ "$response" == *'"message":"OK"'* ]]; then
    echo -e "\nHealth check completed - SUCCESS\n"
    increment_success
  else
    echo -e "\nHealth check failed - FAILURE\n"
    increment_failure
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
    increment_success
  else
    echo -e "\nFailed to post new sample: Sample Name - FAILURE\n"
    increment_failure
  fi
}

getSamples() {
  echo "Retrieving all samples..."
  response=$(curl -s -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=')
  echo "$response"
  if [[ "$response" == *'"_id"'* ]]; then
    echo -e "\nRetrieved all samples - SUCCESS\n"
    increment_success
  else
    echo -e "\nFailed to retrieve samples - FAILURE\n"
    increment_failure
  fi
}

checkMongoCollection() {
  local collection=$1
  local query=$2
  local expected=$3

  echo "Checking MongoDB collection: $collection for $expected"
  response=$(mongo --quiet --eval "db.getCollection('$collection').findOne($query)" mongodb://mongo-db-service.node-js-clean-architecture.orb.local/nodejsdb)
  echo -e "\nMongoDB response:\n$response"

  if [[ "$response" == *'"_id"'* ]]; then
    echo -e "\n$expected exists - SUCCESS\n"
    increment_success
  else
    echo -e "\n$expected does not exist - FAILURE\n"
    increment_failure
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
sleep 1

echo -e "\n\nStep 8: Check MongoDB collections\n"
checkMongoCollection "agendaJobs" '{"name": "send-birthday-mail"}' "Agenda job: send-birthday-mail"
checkMongoCollection "samples" '{"name": "Sample Name"}' "Sample: Sample Name"
checkMongoCollection "users" '{"email": "rai29@example.com"}' "User: rai29@example.com"
sleep 1

echo -e "\n\nClean up: Delete user if exists\n"
deleteUser
sleep 1

# Calculate success percentage
success_percentage=$(awk "BEGIN {printf \"%.2f\", ($tests_succeeded/$total_tests)*100}")

# Display summary
echo -e "\n\nTest Summary:"
echo "Total tests: $total_tests"
echo "Tests succeeded: $tests_succeeded"
echo "Tests failed: $tests_failed"
echo "Success percentage: $success_percentage%"

echo -e "\nScript finished.\n"
