# Todo REST API

A complete Todo REST API built with Node.js, Express, and TypeScript using in-memory storage.

## Features

- ✅ Complete CRUD operations for todos
- ✅ TypeScript for type safety
- ✅ Express.js with proper middleware
- ✅ In-memory storage (no database required)
- ✅ Versioned API routes (`/api/v1/`)
- ✅ Request logging middleware
- ✅ Unified response format
- ✅ Error handling
- ✅ Input validation
- ✅ CORS support

## Project Structure

```
todo-api-ai/
├── src/
│   ├── index.ts                    # Main server file
│   ├── config/db.ts               # In-memory storage
│   ├── controller/todo.controller.ts # CRUD operations
│   ├── models/todo.model.ts       # TypeScript interfaces
│   ├── routers/
│   │   ├── index.ts               # Main API router
│   │   └── todo.router.ts         # Todo routes
│   └── view/
│       ├── response.ts            # Response utilities
│       └── middleware.ts          # Custom middleware
├── package.json
├── tsconfig.json
├── README.md
└── PROMPTS.md
```

## Todo Model

Each todo object has the following structure:

```typescript
interface Todo {
  id: number;        // Auto-generated unique ID
  name: string;      // First name
  lastname: string;  // Last name
  age: number;       // Age (0-150)
}
```

## API Endpoints

### Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todo` | Get all todos |
| GET | `/todo/:id` | Get todo by ID |
| POST | `/todo` | Create new todo |
| PUT | `/todo/:id` | Update todo |
| DELETE | `/todo/:id` | Delete todo |
| GET | `/health` | Health check |

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or create the project:**
   ```bash
   mkdir todo-api-ai
   cd todo-api-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Or build and run production version:**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production server
- `npm run clean` - Remove dist folder

## Usage Examples

### 1. Get All Todos
```bash
curl -X GET http://localhost:3000/api/v1/todo
```

### 2. Get Todo by ID
```bash
curl -X GET http://localhost:3000/api/v1/todo/1
```

### 3. Create New Todo
```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "lastname": "Williams",
    "age": 32
  }'
```

### 4. Update Todo
```bash
curl -X PUT http://localhost:3000/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "age": 26
  }'
```

### 5. Delete Todo
```bash
curl -X DELETE http://localhost:3000/api/v1/todo/1
```

### 6. Health Check
```bash
curl -X GET http://localhost:3000/api/v1/health
```

## Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Sample Data

The API starts with 3 sample todos:

```json
[
  {
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "age": 25
  },
  {
    "id": 2,
    "name": "Jane",
    "lastname": "Smith",
    "age": 30
  },
  {
    "id": 3,
    "name": "Mike",
    "lastname": "Johnson",
    "age": 28
  }
]
```

## Validation Rules

- **name**: Required, must be a string
- **lastname**: Required, must be a string
- **age**: Required, must be a number between 0 and 150

## Error Handling

The API includes comprehensive error handling for:

- Invalid input data
- Missing required fields
- Invalid data types
- Todo not found (404)
- Server errors (500)

## Development

### Server Information

When you start the server, you'll see:

```
🚀 Todo API Server is running on port 3000
📍 API Documentation: http://localhost:3000
🔍 Health Check: http://localhost:3000/api/v1/health
📝 Todos Endpoint: http://localhost:3000/api/v1/todo
```

### Request Logging

All requests are logged with timestamp, method, URL, and IP address:

```
[2024-11-05T10:30:45.123Z] GET /api/v1/todo - IP: ::1
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License