<div align="center">
  <img src="public/icon-512x512.png" alt="The Reyes Vault Logo" width="192" height="192">
  
# **The Reyes Vault**
  
  **A digital vault for preserving family memories. Forever, searchable, and safe in the cloud.**
</div>

This project is a full-stack Next.js application aimed at creating a secure and user-friendly platform for uploading, viewing, organizing, and searching digitized family memories like photos, videos, and audio recordings.

## 🚀 MVP Progress: 36%

[![Progress](https://geps.dev/progress/36?title=MVP)](https://github.com/jameslreyes/the-reyes-vault/blob/main/PLAN.md)

**Completed Milestones:**

- ✅ Project Initialization & Core Infrastructure (Next.js, Supabase, Cloudflare R2, Vercel integration)
- ✅ User Authentication & Authorization (Sign-in, Sign-out, Protected Routes, Session Management)
- ✅ Admin User Management (CRUD operations, role-based access, safety features) - 90% complete

**Next Up:**

- Core Memory Upload & Viewing Features (Phase 4)
- File storage integration with Cloudflare R2
- Memory metadata management

For a detailed breakdown, see the [PLAN.md](PLAN.md).

## ✨ Core MVP Features (Goals)

- **User Accounts:** Secure login for authorized users.
- **Admin User Management:** Admin interface for CRUD operations on users.
- **Memory Upload:** Support for photos, videos, and audio files.
- **Memory Viewing:** Chronological stream of memories with basic filtering.
- **Metadata Entry:** Add/edit titles, dates, descriptions, tags, and people involved.
- **Organization:** Create "Albums" or "Events" to group memories.
- **Search:** Search memories by various metadata fields.

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router, Full-Stack)
- **Language:** TypeScript
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **File Storage:** Cloudflare R2
- **Hosting & CI/CD:** Vercel

## 🏁 Getting Started

To run this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jamesleoreyes/the-reyes-vault.git
   cd the-reyes-vault
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   # yarn install
   # or
   # pnpm install
   ```

3. **Set up environment variables:**

   - Copy the example environment file:

     ```bash
     cp .env.example .env.local
     ```

   - Update the `.env.local` file with your actual values:

     ```bash
     # Demo Mode
     NEXT_PUBLIC_DEMO_MODE=false
     NEXT_PUBLIC_DEMO_MODE_ENABLED=false

     # Supabase
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

     # Cloudflare
     CLOUDFLARE_API_ENDPOINT=https://api.cloudflare.com/client/v4
     CLOUDFLARE_ACCOUNT_ID=your-account-id

     # Cloudflare Turnstile
     NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
     TURNSTILE_SECRET_KEY=your-secret-key

     # Cloudflare R2
     CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
     CLOUDFLARE_R2_TOKEN=your-access-token
     CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id
     CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key
     CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
     CLOUDFLARE_R2_PUBLIC_URL=https://your-public-url.com
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is currently a personal learning project. However, suggestions and feedback are welcome! Please feel free to open an issue for bugs or feature ideas.

_This README will be updated as the project progresses._
