# Network Website

Landing page for Network - A student networking platform.

## Setup

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (optional, defaults provided):
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### Backend

See [backend/README.md](./backend/README.md) for detailed setup instructions.

Quick start:
```bash
# Install backend dependencies
npm run backend:install

# Start backend server
npm run backend:dev
```

## Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001/api)

### Backend
See `backend/.env.example` for required backend environment variables.

## Features

- ✅ Email validation
- ✅ Phone number validation (Dubai & India)
- ✅ One submission per email limit
- ✅ Rate limiting
- ✅ DynamoDB integration
- ✅ Responsive design
- ✅ Custom cursor
- ✅ Smooth animations

## Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
.
├── backend/           # Backend API server
│   ├── services/      # DynamoDB services
│   ├── middleware/    # Rate limiting, etc.
│   └── server.js      # Express server
├── src/               # Frontend source
│   ├── components/    # React components
│   ├── lib/           # Utilities & API client
│   └── ...
└── public/            # Static assets
```

