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
// 200
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
