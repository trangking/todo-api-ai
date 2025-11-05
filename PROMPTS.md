# API Testing with cURL Commands

This file contains comprehensive cURL commands to test all the Todo API endpoints.

## Prerequisites

Make sure the server is running:
```bash
npm run dev
# or
npm start
```

Server should be available at: `http://localhost:3000`

---

## 1. Health Check

Test if the API is running:

```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-11-05T10:30:45.123Z",
  "version": "1.0.0"
}
```

---

## 2. Get All Todos

Retrieve all todos from the database:

```bash
curl -X GET http://localhost:3000/api/v1/todo
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todos retrieved successfully",
  "data": {
    "todos": [
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
    ],
    "count": 3
  }
}
```

---

## 3. Get Todo by ID

### Get Existing Todo (ID: 1)

```bash
curl -X GET http://localhost:3000/api/v1/todo/1
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo retrieved successfully",
  "data": {
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "age": 25
  }
}
```

### Get Non-existent Todo (ID: 999)

```bash
curl -X GET http://localhost:3000/api/v1/todo/999
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}
```

### Invalid ID Format

```bash
curl -X GET http://localhost:3000/api/v1/todo/abc
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid todo ID provided"
}
```

---

## 4. Create New Todo

### Valid Todo Creation

```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "lastname": "Williams",
    "age": 32
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 4,
    "name": "Alice",
    "lastname": "Williams",
    "age": 32
  }
}
```

### Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Missing required fields: name, lastname, and age are required"
}
```

### Invalid Data Types

```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie",
    "lastname": "Brown",
    "age": "thirty"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid data types: name and lastname must be strings, age must be a number"
}
```

### Age Validation (Too High)

```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "David",
    "lastname": "Wilson",
    "age": 200
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Age must be between 0 and 150"
}
```

### Age Validation (Negative)

```bash
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eva",
    "lastname": "Garcia",
    "age": -5
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Age must be between 0 and 150"
}
```

---

## 5. Update Todo

### Update All Fields

```bash
curl -X PUT http://localhost:3000/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "lastname": "Doe Updated",
    "age": 26
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "lastname": "Doe Updated",
    "age": 26
  }
}
```

### Partial Update (Name Only)

```bash
curl -X PUT http://localhost:3000/api/v1/todo/2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Updated"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 2,
    "name": "Jane Updated",
    "lastname": "Smith",
    "age": 30
  }
}
```

### Partial Update (Age Only)

```bash
curl -X PUT http://localhost:3000/api/v1/todo/3 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 29
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 3,
    "name": "Mike",
    "lastname": "Johnson",
    "age": 29
  }
}
```

### Update Non-existent Todo

```bash
curl -X PUT http://localhost:3000/api/v1/todo/999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Non Existent"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}
```

### Update with No Fields

```bash
curl -X PUT http://localhost:3000/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "At least one field (name, lastname, or age) must be provided for update"
}
```

### Update with Invalid Data Type

```bash
curl -X PUT http://localhost:3000/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "age": "invalid"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Age must be a number between 0 and 150"
}
```

---

## 6. Delete Todo

### Delete Existing Todo

```bash
curl -X DELETE http://localhost:3000/api/v1/todo/1
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "deletedId": 1
  }
}
```

### Delete Non-existent Todo

```bash
curl -X DELETE http://localhost:3000/api/v1/todo/999
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}
```

### Delete with Invalid ID

```bash
curl -X DELETE http://localhost:3000/api/v1/todo/abc
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid todo ID provided"
}
```

---

## 7. Root Endpoint

Get API information and available endpoints:

```bash
curl -X GET http://localhost:3000/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Welcome to Todo API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/v1/health",
    "todos": {
      "getAll": "GET /api/v1/todo",
      "getById": "GET /api/v1/todo/:id",
      "create": "POST /api/v1/todo",
      "update": "PUT /api/v1/todo/:id",
      "delete": "DELETE /api/v1/todo/:id"
    }
  }
}
```

---

## 8. Invalid Route

Test 404 handling:

```bash
curl -X GET http://localhost:3000/api/v1/invalid
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Route not found",
  "path": "/api/v1/invalid"
}
```

---

## Testing Workflow

Here's a suggested workflow to test the complete API:

1. **Start the server** and check health
2. **Get all todos** to see initial data
3. **Create a new todo** with valid data
4. **Get the new todo by ID** to verify creation
5. **Update the todo** with new information
6. **Get all todos** again to see the changes
7. **Delete the todo**
8. **Try to get the deleted todo** (should return 404)

### Complete Test Sequence

```bash
# 1. Health check
curl -X GET http://localhost:3000/api/v1/health

# 2. Get all todos (initial state)
curl -X GET http://localhost:3000/api/v1/todo

# 3. Create new todo
curl -X POST http://localhost:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "lastname": "User", "age": 25}'

# 4. Get the new todo (assuming ID 4)
curl -X GET http://localhost:3000/api/v1/todo/4

# 5. Update the todo
curl -X PUT http://localhost:3000/api/v1/todo/4 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Test", "age": 26}'

# 6. Get all todos (verify update)
curl -X GET http://localhost:3000/api/v1/todo

# 7. Delete the todo
curl -X DELETE http://localhost:3000/api/v1/todo/4

# 8. Try to get deleted todo (should fail)
curl -X GET http://localhost:3000/api/v1/todo/4
```

---

## Notes

- All POST and PUT requests require `Content-Type: application/json` header
- The API uses auto-incrementing IDs starting from 4 (since we have 3 initial todos)
- Data is stored in memory, so restarting the server will reset to initial state
- All responses include proper HTTP status codes (200, 201, 400, 404, 500)



EDIT 
เปลี่ยนจาก "module": "commonjs" มาเป็น "NodeNext"
เพื่อรองรับ Node.js รุ่นใหม่ (16+) ที่ใช้ ES Module และป้องกันปัญหา deprecated ใน TypeScript 7.0