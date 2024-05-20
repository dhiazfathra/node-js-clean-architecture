# node-js-clean-architecture

## Project Structure

```
node-js-clean-architecture/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── apiKeyRoutes.ts
│   │   └── sampleRoutes.ts
│   ├── utils/
│   │   └── generateApiKey.ts
│   └── controllers/
│       └── SampleController.ts
│   └── infrastructure/
│       ├── use-cases/
│       │   └── SampleUseCase.ts
│       └── repositories/
│           └── SampleRepository.ts
```

## How to run

```sh
docker-compose up --build -d
```

## How to test

### POST /user

#### Request

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
  -d '{ "email": "jane.doe@example.com", "firstName": "John", "lastName": "Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }' \
  http://localhost:3000/api/user
```

#### Response

```jsonc
// 201
{
  "status": "OK",
  "message": "Successfully created",
  "user": {
    "email": "jane.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "timezoneOffset": -300,
    "_id": "664973f6de4fa93fba624da1",
    "__v": 0,
  },
}
```

### GET /user

#### Request

```sh
curl -X GET \
  -H 'api-token: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
  http://localhost:3000/api/user\?email\=jane.doe@example.com
```

#### Response

```jsonc
// 200
{
  "email": "jane.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "timezoneOffset": -300,
}
```

### DELETE /user

#### Request

```sh

```

#### Response

```jsonc
// 204
{
  "status": "OK",
  "message": "User deleted",
  "user": {
    "email": "jane.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "timezoneOffset": -300,
  },
}
```

### POST /user

#### Request

```sh
curl -X PUT \
  -H "Content-Type: application/json" \
  -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
  -d '{ "email": "jane.doe@example.com", "firstName": "John", "lastName": "Doe", "dateOfBirth": "1990-01-01", "timezoneOffset": -300 }' \
  http://localhost:3000/api/user
```

#### Response

```jsonc
// 201
{
  "status": "OK",
  "message": "User updated",
  "user": {
    "email": "jane.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "timezoneOffset": -300,
  },
}
```

### /health

#### Request

```sh
curl -X GET \
  http://localhost:3000/health
```

#### Response

```jsonc
// 200
{ "message": "OK" }
```

### POST /samples

#### Request

```sh
curl -X POST \
  http://localhost:3000/api/samples \
  -H 'Content-Type: application/json' \
  -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=' \
  -d '{
    "name": "Sample Name",
    "description": "Sample Description"
  }'
```

#### Response

```jsonc
// 201
{
  "status": "OK",
  "message": "Successfully created",
  "sample": {
    "name": "Sample Name",
    "description": "Sample Description",
    "_id": "664873cf30cc29502b613a35",
    "__v": 0,
  },
}
```

### GET /samples

#### Request

```sh
curl -X GET \
  http://localhost:3000/api/samples \
  -H 'api-key: eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H='
```

#### Response

```jsonc
// 200
[
  {
    "_id": "664873cf30cc29502b613a35",
    "name": "Sample Name",
    "description": "Sample Description",
    "__v": 0,
  },
]
```

#### Request

```sh
curl -X GET \
  http://localhost:3000/api/samples
```

#### Response

```jsonc
// 401
{ "error": "Unauthorized" }
```
