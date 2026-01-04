# Network Backend API

Backend API server for Network landing page with DynamoDB integration.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your AWS credentials and configuration:
     ```env
     AWS_REGION=us-east-1
     AWS_ACCESS_KEY_ID=your_access_key_here
     AWS_SECRET_ACCESS_KEY=your_secret_key_here
     DYNAMODB_TABLE_NAME=waitlist
     PORT=3001
     CORS_ORIGIN=http://localhost:5173
     ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Waitlist
- **POST** `/api/waitlist`
- **Body:** `{ "email": "user@example.com" }`
- Adds email to waitlist
- **Rate Limit:** 10 requests per minute per IP
- **Response:**
  ```json
  {
    "success": true,
    "message": "SUBMITTED! We'll be in touch."
  }
  ```

### Partnership Request
- **POST** `/api/partner`
- **Body:**
  ```json
  {
    "organization": "Company Name",
    "contact": "Contact Person",
    "email": "contact@company.com",
    "phone": "+971501234567"
  }
  ```
- Submits partnership request
- **Rate Limit:** 5 requests per minute per IP
- **Response:**
  ```json
  {
    "success": true,
    "message": "Partnership request submitted successfully!"
  }
  ```

## DynamoDB Table Structure

### Table Name: `waitlist`

#### Waitlist Entry:
```json
{
  "email": "user@example.com",
  "type": "waitlist",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Partnership Entry:
```json
{
  "email": "contact@company.com",
  "type": "partnership",
  "organization": "Company Name",
  "contact": "Contact Person",
  "phone": "+971501234567",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Primary Key:** `email` (String)

## Error Responses

- **400 Bad Request:** Invalid input data
- **409 Conflict:** Email already exists
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** Server error

## Environment Variables

- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `DYNAMODB_TABLE_NAME` - DynamoDB table name (default: waitlist)
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:5173)
- `NODE_ENV` - Environment (development/production)

## Notes

- The server includes rate limiting to prevent spam
- Duplicate emails are automatically detected
- All emails are stored in lowercase
- For production, consider using IAM roles instead of access keys
- Rate limiting is in-memory (for production, use Redis)

