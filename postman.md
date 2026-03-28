{
"info": {
"\_postman_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
"name": "📓 Journal API",
"description": "Full REST API collection for the Journal Website backend.\n\n## Setup\n1. Set `baseUrl` variable to `http://localhost:5000`\n2. Run **Signup** or **Login** — the token is auto-saved to `authToken`\n3. All protected routes use `authToken` automatically\n\n## Variables\n- `baseUrl` — your server URL\n- `authToken` — auto-set on login/signup\n- `journalId` — auto-set when you create a journal",
"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
},
"variable": [
{
"key": "baseUrl",
"value": "http://localhost:5000",
"type": "string"
},
{
"key": "authToken",
"value": "",
"type": "string"
},
{
"key": "journalId",
"value": "",
"type": "string"
}
],
"item": [
{
"name": "🏠 Health",
"item": [
{
"name": "Root",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/",
"host": ["{{baseUrl}}"],
"path": [""]
},
"description": "Root endpoint — confirms the API is running."
},
"response": []
},
{
"name": "Health Check",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/health",
"host": ["{{baseUrl}}"],
"path": ["api", "health"]
},
"description": "Returns server status and current timestamp."
},
"response": []
}
]
},
{
"name": "🔐 Auth",
"item": [
{
"name": "Signup",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"if (res.success && res.token) {",
" pm.collectionVariables.set('authToken', res.token);",
" console.log('✅ Token saved:', res.token);",
"}",
"",
"pm.test('Status is 201', () => pm.response.to.have.status(201));",
"pm.test('Has token', () => pm.expect(res.token).to.be.a('string'));",
"pm.test('Has user object', () => pm.expect(res.user).to.be.an('object'));",
"pm.test('Password not exposed', () => pm.expect(res.user.password).to.be.undefined);"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "POST",
"header": [
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\",\n \"password\": \"password123\"\n}"
},
"url": {
"raw": "{{baseUrl}}/api/auth/signup",
"host": ["{{baseUrl}}"],
"path": ["api", "auth", "signup"]
},
"description": "Register a new user. The JWT token is **automatically saved** to `authToken` collection variable."
},
"response": [
{
"name": "Success - 201",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\",\n \"password\": \"password123\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/auth/signup" }
},
"status": "Created",
"code": 201,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n \"user\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\",\n \"createdAt\": \"2024-01-15T10:30:00.000Z\",\n \"updatedAt\": \"2024-01-15T10:30:00.000Z\"\n }\n}"
},
{
"name": "Error - Email already exists (409)",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\",\n \"password\": \"password123\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/auth/signup" }
},
"status": "Conflict",
"code": 409,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"An account with this email already exists.\"\n}"
},
{
"name": "Error - Missing fields (400)",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"email\": \"alice@example.com\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/auth/signup" }
},
"status": "Bad Request",
"code": 400,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Please provide name, email, and password.\"\n}"
}
]
},
{
"name": "Login",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"if (res.success && res.token) {",
" pm.collectionVariables.set('authToken', res.token);",
" console.log('✅ Token saved:', res.token);",
"}",
"",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Has token', () => pm.expect(res.token).to.be.a('string'));",
"pm.test('Has user object', () => pm.expect(res.user).to.be.an('object'));",
"pm.test('Password not exposed', () => pm.expect(res.user.password).to.be.undefined);"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "POST",
"header": [
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"email\": \"alice@example.com\",\n \"password\": \"password123\"\n}"
},
"url": {
"raw": "{{baseUrl}}/api/auth/login",
"host": ["{{baseUrl}}"],
"path": ["api", "auth", "login"]
},
"description": "Login with email and password. The JWT token is **automatically saved** to `authToken`."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"email\": \"alice@example.com\",\n \"password\": \"password123\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/auth/login" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n \"user\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\"\n }\n}"
},
{
"name": "Error - Wrong credentials (401)",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"email\": \"alice@example.com\",\n \"password\": \"wrongpassword\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/auth/login" }
},
"status": "Unauthorized",
"code": 401,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Invalid email or password.\"\n}"
}
]
},
{
"name": "Get Me",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Has user object', () => pm.expect(res.user).to.be.an('object'));",
"pm.test('Password not exposed', () => pm.expect(res.user.password).to.be.undefined);"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/auth/me",
"host": ["{{baseUrl}}"],
"path": ["api", "auth", "me"]
},
"description": "Returns the currently authenticated user's profile. Requires Bearer token."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "GET",
"header": [{ "key": "Authorization", "value": "Bearer {{authToken}}" }],
"url": { "raw": "{{baseUrl}}/api/auth/me" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"user\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\",\n \"createdAt\": \"2024-01-15T10:30:00.000Z\"\n }\n}"
},
{
"name": "Error - No token (401)",
"originalRequest": {
"method": "GET",
"header": [],
"url": { "raw": "{{baseUrl}}/api/auth/me" }
},
"status": "Unauthorized",
"code": 401,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Access denied. No token provided.\"\n}"
}
]
}
]
},
{
"name": "📓 Journals",
"item": [
{
"name": "Create Journal",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"if (res.success && res.journal) {",
" pm.collectionVariables.set('journalId', res.journal._id);",
" console.log('✅ Journal ID saved:', res.journal._id);",
"}",
"",
"pm.test('Status is 201', () => pm.response.to.have.status(201));",
"pm.test('Has journal object', () => pm.expect(res.journal).to.be.an('object'));",
"pm.test('Has title', () => pm.expect(res.journal.title).to.be.a('string'));",
"pm.test('Has author populated', () => pm.expect(res.journal.author).to.be.an('object'));"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "POST",
"header": [
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"My First Journal Entry\",\n \"content\": \"Today was an amazing day. I started working on a new project and the progress has been really great. Looking forward to what tomorrow brings!\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\", \"productivity\"]\n}"
},
"url": {
"raw": "{{baseUrl}}/api/journals",
"host": ["{{baseUrl}}"],
"path": ["api", "journals"]
},
"description": "Create a new journal entry. The `journalId` is **auto-saved** for use in other requests.\n\n**Visibility options:** `public` | `private`\n\n**Tags:** optional array of strings"
},
"response": [
{
"name": "Success - 201",
"originalRequest": {
"method": "POST",
"header": [
{ "key": "Content-Type", "value": "application/json" },
{ "key": "Authorization", "value": "Bearer {{authToken}}" }
],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"My First Journal Entry\",\n \"content\": \"Today was an amazing day...\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\"]\n}"
},
"url": { "raw": "{{baseUrl}}/api/journals" }
},
"status": "Created",
"code": 201,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"journal\": {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My First Journal Entry\",\n \"content\": \"Today was an amazing day...\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\"],\n \"author\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\"\n },\n \"createdAt\": \"2024-01-15T11:00:00.000Z\",\n \"updatedAt\": \"2024-01-15T11:00:00.000Z\"\n }\n}"
},
{
"name": "Error - Missing fields (400)",
"originalRequest": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"Only Title\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/journals" }
},
"status": "Bad Request",
"code": 400,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Title and content are required.\"\n}"
}
]
},
{
"name": "Create Private Journal",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 201', () => pm.response.to.have.status(201));",
"pm.test('Visibility is private', () => pm.expect(res.journal.visibility).to.equal('private'));"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "POST",
"header": [
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"My Private Thoughts\",\n \"content\": \"This is a personal reflection I want to keep to myself. Deep thoughts about the future and where I want to be in the next five years.\",\n \"visibility\": \"private\",\n \"tags\": [\"personal\", \"reflection\"]\n}"
},
"url": {
"raw": "{{baseUrl}}/api/journals",
"host": ["{{baseUrl}}"],
"path": ["api", "journals"]
},
"description": "Create a private journal that only you can see."
},
"response": []
},
{
"name": "Get Public Feed",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Has journals array', () => pm.expect(res.journals).to.be.an('array'));",
"pm.test('Has pagination fields', () => {",
" pm.expect(res.total).to.be.a('number');",
" pm.expect(res.page).to.be.a('number');",
" pm.expect(res.pages).to.be.a('number');",
"});",
"pm.test('All journals are public', () => {",
" res.journals.forEach(j => pm.expect(j.visibility).to.equal('public'));",
"});"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/feed?page=1&limit=10",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "feed"],
"query": [
{ "key": "page", "value": "1", "description": "Page number (default: 1)" },
{ "key": "limit", "value": "10", "description": "Results per page (default: 10)" }
]
},
"description": "Fetch all **public** journals. No authentication required. Supports pagination."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "GET",
"url": { "raw": "{{baseUrl}}/api/journals/feed?page=1&limit=10" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"total\": 42,\n \"page\": 1,\n \"pages\": 5,\n \"journals\": [\n {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My First Journal Entry\",\n \"content\": \"Today was an amazing day...\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\"],\n \"author\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\"\n },\n \"createdAt\": \"2024-01-15T11:00:00.000Z\"\n }\n ]\n}"
}
]
},
{
"name": "Get My Journals",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Has journals array', () => pm.expect(res.journals).to.be.an('array'));",
"pm.test('Has pagination fields', () => {",
" pm.expect(res.total).to.be.a('number');",
" pm.expect(res.page).to.be.a('number');",
"});"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/my?page=1&limit=10",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "my"],
"query": [
{ "key": "page", "value": "1", "description": "Page number" },
{ "key": "limit", "value": "10", "description": "Results per page" },
{ "key": "visibility", "value": "", "description": "Filter: 'public' or 'private'", "disabled": true }
]
},
"description": "Get all journals belonging to the logged-in user (both public and private). Supports pagination and optional `visibility` filter."
},
"response": [
{
"name": "Success - All journals",
"originalRequest": {
"method": "GET",
"header": [{ "key": "Authorization", "value": "Bearer {{authToken}}" }],
"url": { "raw": "{{baseUrl}}/api/journals/my?page=1&limit=10" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"total\": 5,\n \"page\": 1,\n \"pages\": 1,\n \"journals\": [\n {\n \"_id\": \"64xyz789abc012\",\n \"title\": \"My First Journal Entry\",\n \"visibility\": \"public\",\n \"createdAt\": \"2024-01-15T11:00:00.000Z\"\n },\n {\n \"_id\": \"64xyz789abc013\",\n \"title\": \"My Private Thoughts\",\n \"visibility\": \"private\",\n \"createdAt\": \"2024-01-15T12:00:00.000Z\"\n }\n ]\n}"
}
]
},
{
"name": "Get My Private Journals Only",
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/my?visibility=private",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "my"],
"query": [
{ "key": "visibility", "value": "private" }
]
},
"description": "Filter your journals to only show private ones."
},
"response": []
},
{
"name": "Get My Public Journals Only",
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/my?visibility=public",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "my"],
"query": [
{ "key": "visibility", "value": "public" }
]
},
"description": "Filter your journals to only show public ones."
},
"response": []
},
{
"name": "Get Journal by ID",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Has journal object', () => pm.expect(res.journal).to.be.an('object'));",
"pm.test('Has author populated', () => pm.expect(res.journal.author).to.be.an('object'));",
"pm.test('Has createdAt', () => pm.expect(res.journal.createdAt).to.be.a('string'));"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/{{journalId}}",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "{{journalId}}"]
},
"description": "Get a single journal by ID. Public journals are accessible by anyone. Private journals are only accessible by their owner."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "GET",
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"journal\": {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My First Journal Entry\",\n \"content\": \"Today was an amazing day. I started working on a new project...\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\", \"productivity\"],\n \"author\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\",\n \"email\": \"alice@example.com\"\n },\n \"createdAt\": \"2024-01-15T11:00:00.000Z\",\n \"updatedAt\": \"2024-01-15T11:00:00.000Z\"\n }\n}"
},
{
"name": "Error - Private journal (403)",
"originalRequest": {
"method": "GET",
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "Forbidden",
"code": 403,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"This journal is private.\"\n}"
},
{
"name": "Error - Not found (404)",
"originalRequest": {
"method": "GET",
"url": { "raw": "{{baseUrl}}/api/journals/64000000000000000000dead" }
},
"status": "Not Found",
"code": 404,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Journal not found.\"\n}"
}
]
},
{
"name": "Update Journal",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Journal updated', () => pm.expect(res.journal).to.be.an('object'));",
"pm.test('Title updated', () => pm.expect(res.journal.title).to.equal('My Updated Journal Entry'));"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "PUT",
"header": [
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"My Updated Journal Entry\",\n \"content\": \"I've updated this journal with more detailed thoughts. The project is going really well and I'm learning so much every day.\",\n \"tags\": [\"life\", \"work\", \"growth\"]\n}"
},
"url": {
"raw": "{{baseUrl}}/api/journals/{{journalId}}",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "{{journalId}}"]
},
"description": "Update an existing journal. Only the owner can update. You can send only the fields you want to update — others are left unchanged."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "PUT",
"header": [
{ "key": "Content-Type", "value": "application/json" },
{ "key": "Authorization", "value": "Bearer {{authToken}}" }
],
"body": {
"mode": "raw",
"raw": "{\n \"title\": \"My Updated Journal Entry\",\n \"content\": \"Updated content here...\"\n}"
},
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"journal\": {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My Updated Journal Entry\",\n \"content\": \"Updated content here...\",\n \"visibility\": \"public\",\n \"tags\": [\"life\", \"work\", \"growth\"],\n \"author\": {\n \"\_id\": \"64abc123def456\",\n \"name\": \"Alice Johnson\"\n },\n \"updatedAt\": \"2024-01-15T14:00:00.000Z\"\n }\n}"
},
{
"name": "Error - Not owner (403)",
"originalRequest": {
"method": "PUT",
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "Forbidden",
"code": 403,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"You are not authorized to update this journal.\"\n}"
}
]
},
{
"name": "Toggle Visibility",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Visibility toggled', () => {",
" const v = res.journal.visibility;",
" pm.expect(['public', 'private']).to.include(v);",
"});",
"console.log('New visibility:', res.journal.visibility);"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "PATCH",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/{{journalId}}/visibility",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "{{journalId}}", "visibility"]
},
"description": "Toggle journal visibility between `public` and `private`. No request body needed — it just flips the current state."
},
"response": [
{
"name": "Success - Toggled to private",
"originalRequest": {
"method": "PATCH",
"header": [{ "key": "Authorization", "value": "Bearer {{authToken}}" }],
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}/visibility" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"message\": \"Journal is now private.\",\n \"journal\": {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My Updated Journal Entry\",\n \"visibility\": \"private\",\n \"updatedAt\": \"2024-01-15T15:00:00.000Z\"\n }\n}"
},
{
"name": "Success - Toggled to public",
"originalRequest": {
"method": "PATCH",
"header": [{ "key": "Authorization", "value": "Bearer {{authToken}}" }],
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}/visibility" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"message\": \"Journal is now public.\",\n \"journal\": {\n \"\_id\": \"64xyz789abc012\",\n \"title\": \"My Updated Journal Entry\",\n \"visibility\": \"public\",\n \"updatedAt\": \"2024-01-15T15:05:00.000Z\"\n }\n}"
}
]
},
{
"name": "Delete Journal",
"event": [
{
"listen": "test",
"script": {
"exec": [
"const res = pm.response.json();",
"pm.test('Status is 200', () => pm.response.to.have.status(200));",
"pm.test('Success message', () => pm.expect(res.message).to.include('deleted'));"
],
"type": "text/javascript"
}
}
],
"request": {
"auth": {
"type": "bearer",
"bearer": [{ "key": "token", "value": "{{authToken}}", "type": "string" }]
},
"method": "DELETE",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/{{journalId}}",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "{{journalId}}"]
},
"description": "Delete a journal entry. Only the owner can delete their journals."
},
"response": [
{
"name": "Success - 200",
"originalRequest": {
"method": "DELETE",
"header": [{ "key": "Authorization", "value": "Bearer {{authToken}}" }],
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "OK",
"code": 200,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": true,\n \"message\": \"Journal deleted successfully.\"\n}"
},
{
"name": "Error - Not owner (403)",
"originalRequest": {
"method": "DELETE",
"url": { "raw": "{{baseUrl}}/api/journals/{{journalId}}" }
},
"status": "Forbidden",
"code": 403,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"You are not authorized to delete this journal.\"\n}"
}
]
}
]
},
{
"name": "❌ Error Cases",
"item": [
{
"name": "404 - Unknown Route",
"event": [
{
"listen": "test",
"script": {
"exec": [
"pm.test('Status is 404', () => pm.response.to.have.status(404));",
"pm.test('Success is false', () => pm.expect(pm.response.json().success).to.be.false);"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/unknown-route",
"host": ["{{baseUrl}}"],
"path": ["api", "unknown-route"]
},
"description": "Tests the 404 handler for undefined routes."
},
"response": []
},
{
"name": "401 - Invalid Token",
"event": [
{
"listen": "test",
"script": {
"exec": [
"pm.test('Status is 401', () => pm.response.to.have.status(401));",
"pm.test('Unauthorized message', () => pm.expect(pm.response.json().success).to.be.false);"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "GET",
"header": [
{ "key": "Authorization", "value": "Bearer invalidtoken123" }
],
"url": {
"raw": "{{baseUrl}}/api/auth/me",
"host": ["{{baseUrl}}"],
"path": ["api", "auth", "me"]
},
"description": "Tests that an invalid token is properly rejected."
},
"response": [
{
"name": "Error - Invalid token (401)",
"originalRequest": {
"method": "GET",
"header": [{ "key": "Authorization", "value": "Bearer invalidtoken" }],
"url": { "raw": "{{baseUrl}}/api/auth/me" }
},
"status": "Unauthorized",
"code": 401,
"\_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Invalid token.\"\n}"
}
]
},
{
"name": "400 - Invalid Journal ID",
"event": [
{
"listen": "test",
"script": {
"exec": [
"pm.test('Status is 400', () => pm.response.to.have.status(400));"
],
"type": "text/javascript"
}
}
],
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "{{baseUrl}}/api/journals/not-a-valid-id",
"host": ["{{baseUrl}}"],
"path": ["api", "journals", "not-a-valid-id"]
},
"description": "Tests the CastError handler for malformed MongoDB IDs."
},
"response": [
{
"name": "Error - Invalid ID (400)",
"originalRequest": {
"method": "GET",
"url": { "raw": "{{baseUrl}}/api/journals/not-a-valid-id" }
},
"status": "Bad Request",
"code": 400,
"_postman_previewlanguage": "json",
"body": "{\n \"success\": false,\n \"message\": \"Invalid journal ID.\"\n}"
}
]
}
]
}
]
}
