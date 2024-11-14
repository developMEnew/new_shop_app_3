# New Shop App 3

A modern inventory management system built with Next.js, MongoDB, and TypeScript.

## Database Setup

### 1. MongoDB Setup

1. Create a MongoDB Atlas account:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project

2. Create a new cluster:
   - Click "Build a Database"
   - Choose the FREE tier
   - Select your preferred cloud provider and region
   - Click "Create"

3. Set up database access:
   - Go to "Database Access" in the security menu
   - Click "Add New Database User"
   - Create a username and password
   - Select "Read and write to any database"
   - Click "Add User"

4. Configure network access:
   - Go to "Network Access" in the security menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password

### 2. Environment Setup

1. Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

Replace:
- `your_mongodb_connection_string` with the connection string from MongoDB Atlas
- `your_database_name` with your preferred database name (e.g., "shop_inventory")

### 3. Database Schema

The application uses the following collection structure:

```typescript
// Items Collection
{
  _id: ObjectId,
  name: string,
  costPrice: number,
  sellingPrice: number,
  description: string,
  images: string[]
}
```

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Add, edit, and delete inventory items
- Track cost price and selling price
- Calculate profit margins
- Upload and manage item images
- Responsive design for all devices

## Tech Stack

- Next.js 14
- MongoDB
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- React Hook Form
- Zod Validation

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   └── page.tsx       # Main page
├── components/        # React components
├── lib/              # Utility functions
└── types/            # TypeScript types
```

## API Routes

- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/[id]` - Update item
- `DELETE /api/items/[id]` - Delete item

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Developer

Created by Develop M Enew
