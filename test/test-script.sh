#!/usr/bin/env bash

# Variables for counting successes and failures
total_tests=0
tests_succeeded=0
tests_failed=0

# Default values for output options
output_console=true
output_file=true
output_file_path="test/output/output_$(date +%Y%m%d_%H%M%S).log"

# Create the output directory if it doesn't exist
mkdir -p test/output

# Functions

increment_success() {
  ((total_tests++))
  ((tests_succeeded++))
}

increment_failure() {
  ((total_tests++))
  ((tests_failed++))
}

print_output() {
  local message=$1
  if $output_console; then
    echo -e "$message"
  fi
  if $output_file; then
    echo -e "$message" >> "$output_file_path"
  fi
}

postUser() {
  print_output "Posting a new user..."
  response=$(curl -s -X POST \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "Jane Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }')
  print_output "$response"
  if [[ "$response" == *'"status":"Created"'* ]]; then
    print_output "\nPosted new user: jane.doe@example.com - SUCCESS\n"
    increment_success
  else
    print_output "\nFailed to post new user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

getUser() {
  print_output "Retrieving user information..."
  response=$(curl -s -X GET \
    "$URL/user?email=jane.doe@example.com" \
    -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=')
  print_output "$response"
  if [[ "$response" == *'"email":"jane.doe@example.com"'* ]]; then
    print_output "\nRetrieved user: jane.doe@example.com - SUCCESS\n"
    increment_success
  else
    print_output "\nFailed to retrieve user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

deleteUser() {
  print_output "Deleting user..."
  response=$(curl -s -X DELETE \
    "$URL/user?email=jane.doe@example.com" \
    -H "Content-Type: application/json" \
    -d '{ "email": "jane.doe@example.com" }')
  
  if [[ -z "$response" || "$response" == *'"status":"No Content"'* || "$response" == *'"status":"Not Found"'* || "$response" == *'"message":"User deleted"'* ]]; then
    print_output "\nDeleted user: jane.doe@example.com - SUCCESS\n"
    increment_success
  else
    print_output "$response"
    print_output "\nFailed to delete user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

putUser() {
  print_output "Updating user information..."
  response=$(curl -s -X PUT \
    "$URL/user" \
    -H "Content-Type: application/json" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{ "email": "jane.doe@example.com", "fullName": "John Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }')
  print_output "$response"
  if [[ "$response" == *'"status":"OK"'* ]]; then
    print_output "\nUpdated user: jane.doe@example.com to John Doe - SUCCESS\n"
    increment_success
  else
    print_output "\nFailed to update user: jane.doe@example.com - FAILURE\n"
    increment_failure
  fi
}

getHealth() {
  print_output "Checking health endpoint..."
  response=$(curl -s -X GET \
    "$URL/health")
  print_output "$response"
  if [[ "$response" == *'"message":"OK"'* ]]; then
    print_output "\nHealth check completed - SUCCESS\n"
    increment_success
  else
    print_output "\nHealth check failed - FAILURE\n"
    increment_failure
  fi
}

postSample() {
  print_output "Posting a new sample..."
  response=$(curl -s -X POST \
    "$URL/samples" \
    -H 'Content-Type: application/json' \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
    -d '{
      "name": "Sample Name",
      "description": "Sample Description"
    }')
  print_output "$response"
  if [[ "$response" == *'"status":"OK"'* ]]; then
    print_output "\nPosted new sample: Sample Name - SUCCESS\n"
    increment_success
  else
    print_output "\nFailed to post new sample: Sample Name - FAILURE\n"
    increment_failure
  fi
}

getSamples() {
  print_output "Retrieving all samples..."
  response=$(curl -s -X GET \
    "$URL/samples" \
    -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=')
  print_output "$response"
  if [[ "$response" == *'"_id"'* ]]; then
    print_output "\nRetrieved all samples - SUCCESS\n"
    increment_success
  else
    print_output "\nFailed to retrieve samples - FAILURE\n"
    increment_failure
  fi
}

checkMongoCollection() {
  local collection=$1
  local query=$2
  local expected=$3

  print_output "Checking MongoDB collection: $collection for $expected"
  response=$(mongo --quiet --eval "db.getCollection('$collection').findOne($query)" mongodb://mongo-db-service.node-js-clean-architecture.orb.local/nodejsdb)
  print_output "\nMongoDB response:\n$response"

  if [[ "$response" == *'"_id"'* ]]; then
    print_output "\n$expected exists - SUCCESS\n"
    increment_success
  else
    print_output "\n$expected does not exist - FAILURE\n"
    increment_failure
  fi
}

test_agenda_job_existence() {
  local job_name=$1
  print_output "Checking MongoDB collection for Agenda job: $job_name"
  response=$(mongo --quiet --eval "db.getCollection('agendaJobs').findOne({ name: '$job_name' })" mongodb://mongo-db-service.node-js-clean-architecture.orb.local/nodejsdb)
  if [[ "$response" == *"$job_name"* ]]; then
    print_output "\nAgenda job $job_name exists - SUCCESS\n"
    increment_success
  else
    print_output "\nAgenda job $job_name does not exist - FAILURE\n"
    increment_failure
  fi
}

# Display help message
show_help() {
  echo "Usage: ./test/test-script.sh [options]"
  echo ""
  echo "Options:"
  echo "  -c, --console      Print output to console (default)"
  echo "  -f, --file         Print output to file"
  echo "  -b, --both         Print output to both console and file"
  echo "  -o, --output       Specify output file path (default: test/output/output_YYYYMMDD_HHMMSS.log)"
  echo "  -h, --help         Display this help message"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -c|--console)
      output_console=true
      output_file=false
      shift
      ;;
    -f|--file)
      output_console=false
      output_file=true
      shift
      ;;
    -b|--both)
      output_console=true
      output_file=true
      shift
      ;;
    -o|--output)
      output_file_path="test/output/$2"
      shift 2
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Variables
URL="http://localhost:3000/api/v1"

# Testing

print_output "\nStarting script...\n"

print_output "\nStep 1: Delete user if exists\n"
deleteUser
sleep 1

print_output "\n\nStep 2: Post new user\n"
postUser
sleep 1

print_output "\n\nStep 3: Get user information\n"
getUser
sleep 1

print_output "\n\nStep 4: Update user information\n"
putUser
sleep 1

print_output "\n\nStep 5: Check health endpoint\n"
getHealth
sleep 1

print_output "\n\nStep 6: Post new sample\n"
postSample
sleep 1

print_output "\n\nStep 7: Get all samples\n"
getSamples
sleep 1

print_output "\n\nStep 8: Check MongoDB collections\n"
checkMongoCollection "agendaJobs" '{"name": "send-birthday-mail"}' "Agenda job: send-birthday-mail"
checkMongoCollection "samples" '{"name": "Sample Name"}' "Sample: Sample Name"
checkMongoCollection "users" '{"email": "rai29@example.com"}' "User: rai29@example.com"
sleep 1

print_output "\n\nStep 9: Check for the existence of the Agenda job 'send-birthday-mail'\n"
test_agenda_job_existence "send-birthday-mail-to-rai29@example.com"
sleep 1

print_output "\n\nClean up: Delete user if exists\n"
deleteUser
sleep 1

# Calculate success percentage
success_percentage=$(awk "BEGIN {printf \"%.2f\", ($tests_succeeded/$total_tests)*100}")

# Display summary
print_output "\n\nTest Summary:"
print_output "Total tests: $total_tests"
print_output "Tests succeeded: $tests_succeeded"
print_output "Tests failed: $tests_failed"
print_output "Success percentage: $success_percentage%"

print_output "\nScript execution completed.\n"
