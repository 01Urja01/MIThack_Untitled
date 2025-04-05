# SwiftClaim Frontend

This is the frontend application for SwiftClaim, built with Next.js.

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root of the `frontend` directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## API Client

The application uses a centralized API client for making API requests. The client automatically:

1. Appends the base URL from environment variables
2. Handles authentication by adding the token from session storage
3. Processes responses and handles errors

### Usage

```typescript
import apiClient from '@/lib/api-client';

// GET request
const data = await apiClient.get('endpoint');

// POST request with data
const response = await apiClient.post('endpoint', { key: 'value' });

// PUT request
const updateResponse = await apiClient.put('endpoint', { key: 'updatedValue' });

// DELETE request
await apiClient.delete('endpoint');
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 