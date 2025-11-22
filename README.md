![JUST-A](https://res.cloudinary.com/dmsvn9nzs/image/upload/v1763826238/project-justa_fun6za.png)
![JUST-A](https://res.cloudinary.com/dmsvn9nzs/image/upload/v1763826238/project-justa-2_yegzql.png)

# JUST-A (Anime List)

**JUST-A** is a modern web application for discovering and tracking anime. Built with **Next.js 14**, this application utilizes the **Jikan API** (Unofficial MyAnimeList API) to provide real-time data on popular, airing, and seasonal anime. It features a robust user system allowing for collections, commenting, and social interactions like likes/dislikes.

## 🚀 Features

- **Browse Anime:** View Top Anime, Seasonal releases (e.g., Spring 2024), and currently Airing anime.
- **Search Functionality:** Real-time search for anime titles using the Jikan API/page.jsx].
- **Detailed Information:** View anime details, synopses, scores, genres, and watch trailers/page.jsx].
- **User Authentication:** Secure login via **Google** and **GitHub** using NextAuth.js/route.js].
- **Personal Collection:** Users can add anime to their personal archive/collection.
- **Interactive Comments:**
    - Post and delete comments on anime pages.
    - Like and Dislike functionality for comments.
- **User Dashboard:** Manage profile (change username), view collections, and track comment history.
- **Responsive Design:** Fully responsive UI built with **Tailwind CSS**.

## ⚙️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** JavaScript (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** MongoDB
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Data Source:** [Jikan API v4](https://jikan.moe/)
- **Icons:** @phosphor-icons/react & react-icons

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A MongoDB database (Local or Atlas)

### 1. Clone the Repository

Bash

```bash
git clone https://github.com/idmaja/JUST-A.git
cd JUST-A
```

### 2. Install Dependencies

Bash

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and populate it with the necessary API keys and database configuration based on `src/services/prisma.js` and `src/app/api/auth/[...nextauth]/route.js`:

Cuplikan kode

### Jikan API Base URL
```env
NEXT_PUBLIC_API_BASE_URL="https://api.jikan.moe/v4"
```

### Database Connection (MongoDB)
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/animelist"
```

### NextAuth Configuration
```env
NEXTAUTH_SECRET="your_super_secret_random_string"
NEXTAUTH_URL="http://localhost:3000"
```

### OAuth Providers
```env
GITHUB_CLIENT="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"`
```

### 4. Database Setup

Sync your Prisma schema with your MongoDB database:

Bash
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Application

Start the development server:

Bash

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000&authuser=3) in your browser to see the application.

## 🏗️ Project Structure

Here is a brief overview of the project structure based on the uploaded files:

```txt
JUST-A/
├── prisma/
│   └── schema.prisma      # Database schema (User, Collection, Comment, Anime)
├── public/                # Static assets (images, svgs)
├── src/
│   ├── app/               # Next.js App Router pages (api routes, auth, anime, users)
│   ├── components/        # Reusable React components
│   │   ├── AnimeList/     # Components specific to anime listing & interactions
│   │   ├── Dashboard/     # Components for user dashboard
│   │   ├── Navbar/        # Navigation bar components
│   │   └── Utilities/     # Helper components (Pagination, VideoPlayer, etc.)
│   ├── services/          # API and Database services (auth-service, prisma, api-service)
│   └── middleware.js      # Next.js middleware for route protection
└── ...config files
```

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International Public License**. See the [LICENSE](https://www.google.com/search?q=LICENSE&authuser=3) file for details.

## 🙌 Acknowledgements

- [Jikan API](https://jikan.moe/) for providing the anime data.
- [Dea Afrizal](https://www.youtube.com/@deaafrizal) (btw this project was inspired by his Next.js course).
