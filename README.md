This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```markdown
# Next.js Movie/Anime List Project

This is a Next.js project for listing movies and anime, utilizing the [Jikan API](https://api.jikan.moe/v4) for data retrieval. The project uses MongoDB as its database and Prisma as the ORM. Before running the project, ensure you initialize the environment variables.

## Features

- List movies and anime fetched from the Jikan API.
- MongoDB for database management.
- Prisma for ORM.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```plaintext
# MongoDB connection string
DATABASE_URL="your_mongodb_connection_string"

# Jikan API base URL
JIKAN_API_BASE_URL="https://api.jikan.moe/v4"
```

### 4. Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 5. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

Then, to start the production server, run:

```bash
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License.
```

Feel free to replace `your-username` and `your-repo-name` with your actual GitHub username and repository name. This `README.md` provides a clear and concise overview of your project, its prerequisites, setup instructions, and resources for further learning.
