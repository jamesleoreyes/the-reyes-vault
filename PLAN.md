# PLAN.MD: The Reyes Vault - MVP Development

## Introduction & Goals

**Application:** The Reyes Vault - A digital vault for preserving family memories. Forever, searchable, and safe in the cloud.

**MVP Goal:** To launch a functional and secure web application that allows a designated admin to manage users, and for authorized users to upload, view, organize, and search their digitized family memories (photos, videos, audio). The MVP will prioritize robust storage, ease of use for core features, and a foundation for future enhancements. This project also serves as a learning opportunity for full-stack Next.js development.

## Core MVP Features

- **User Accounts:**
  - Login for authorized users (email/username + password).
  - No public registration; users created by an admin.
  - Role-based access control (distinguishing between regular users and admin).
- **Admin User Management:**
  - Dedicated, secure admin UI within the main application (e.g., under `/admin/*` routes).
  - Admin can perform CRUD operations (Create, Read, Update, Delete) for users.
  - User access controlled via an allowlist (e.g., by email).
- **Memory Upload:**
  - Users can upload photos, videos, and audio files.
  - Support for primary formats (e.g., `.jpg`, `.png`, `.mp4`, `.mov`, `.mp3`, `.wav`).
  - Desktop: Drag-and-drop and file selector.
  - Mobile: File selector for uploads.
- **Memory Viewing:**
  - Users can view their own uploaded memories.
  - Simple chronological stream of memories.
  - Basic filtering by memory type and other metadata.
- **Metadata Entry:**
  - Users can add/edit metadata for each memory: title, date, description, tags, people involved.
- **Organization:**
  - Users can create "Albums" or "Events" to group memories.
- **Search:**
  - Users can search memories by titles, dates, descriptions, tags, and people.

## Technology Stack

- **Framework:** Next.js (App Router, Full-Stack: Frontend, API Route Handlers, Server Actions)
- **Language:** TypeScript (with strict typing)
- **UI Library:** shadcn/ui with Tailwind CSS (and Radix UI primitives as needed)
- **Database:** PostgreSQL (hosted on Supabase)
- **Authentication:** Supabase Auth (integrated with Next.js)
- **File Storage:** Cloudflare R2 (S3-compatible object storage)
- **Hosting & CI/CD:** Vercel (with GitHub integration for automated builds and deployments)
- **Styling:** Tailwind CSS

## Development Phases & Steps

### Phase 1: Project Setup & Core Infrastructure (Estimated: 1-2 weeks)

[![Phase 1 Progress](https://geps.dev/progress/100?title=Phase%201)](PLAN.md#phase-1-project-setup--core-infrastructure-estimated-1-2-weeks)

- ~~**Step 1.1: Initialize Next.js Project**~~
  - ~~`create-next-app` with TypeScript, ESLint, Tailwind CSS.~~
  - ~~Set up project structure (e.g., `src/app`, `src/components`, `src/lib`, `src/utils`).~~
- ~~**Step 1.2: Set Up Version Control**~~
  - ~~Initialize Git repository.~~
  - ~~Push to GitHub.~~
- ~~**Step 1.3: Supabase Project Setup**~~
  - ~~Create a new Supabase project.~~
  - ~~Note down API keys and database connection strings.~~
  - ~~Design initial database schema for:~~
    - ~~`users` (leveraging Supabase Auth users table, potentially adding custom profile table linked via user ID)~~
    - ~~`memories` (id, user_id, title, description, date, type, storage_url, created_at, updated_at)~~
    - ~~`tags` (id, name)~~
    - ~~`people` (id, name)~~
    - ~~`albums` (id, user_id, name, description)~~
    - ~~Junction tables: `memory_tags`, `memory_people`, `album_memories`.~~
- ~~**Step 1.4: Cloudflare R2 Setup**~~
  - ~~Create a Cloudflare R2 bucket.~~
  - ~~Configure public access settings as appropriate (or use signed URLs).~~
  - ~~Note down access keys and endpoint.~~
- ~~**Step 1.5: Vercel Project Setup**~~
  - ~~Connect GitHub repository to Vercel.~~
  - ~~Configure environment variables (Supabase keys, R2 keys, etc.).~~
  - ~~Verify basic deployment pipeline is working.~~
- ~~**Step 1.6: Basic Layout & UI Shell**~~
  - ~~Implement main application layout using Next.js App Router (`layout.tsx`).~~
  - ~~Integrate shadcn/ui: `npx shadcn-ui@latest init`.~~
  - ~~Set up basic navigation (e.g., placeholder links for Home, Upload, Albums).~~
- ~~**Step 1.7: Environment Configuration**~~
  - ~~Set up `.env.local` for development.~~
  - ~~Ensure Vercel environment variables are correctly configured for production/preview.~~
- ~~**Step 1.8: TypeScript Configuration**~~
  - ~~Review and enforce strict `tsconfig.json` settings.~~
  - ~~Set up ESLint and Prettier for code quality and consistency.~~

---

### Phase 2: User Authentication & Authorization (Estimated: 1-2 weeks)

[![Phase 2 Progress](https://geps.dev/progress/100?title=Phase%202)](PLAN.md#phase-2-user-authentication--authorization-estimated-1-2-weeks)

- ~~**Step 2.1: Integrate Supabase Auth with Next.js**~~
  - ~~Use Supabase helper libraries for Next.js (e.g., `@supabase/auth-helpers-nextjs` or the latest recommended package).~~
  - ~~Implement login page/component (email/password).~~
  - ~~Implement logout functionality.~~
  - ~~Set up session management (Supabase handles much of this).~~
- ~~**Step 2.2: Create Protected Routes**~~
  - ~~Implement logic (e.g., in Middleware or Layouts/Pages) to protect routes that require authentication.~~
  - ~~Redirect unauthenticated users to the login page.~~
- ~~**Step 2.3: User Profile Management (Basic)**~~
  - ~~Create a simple user profile page where a logged-in user can see their email (no editing needed for MVP, as users are admin-managed).~~
- ~~**Step 2.4: Define User Roles**~~
  - ~~Establish a simple role system (e.g., `user`, `admin`). This can be stored in Supabase (e.g., in `auth.users` metadata or a separate `profiles` table).~~
  - ~~Ensure the primary admin account has the `admin` role.~~

---

### Phase 3: Admin User Management (Estimated: 1-2 weeks)

[![Phase 3 Progress](https://geps.dev/progress/36?title=Phase%203)](PLAN.md#phase-3-admin-user-management-estimated-1-2-weeks)

- ~~**Step 3.1: Design Admin UI Layout**~~
  - ~~Create a distinct layout for admin section routes (e.g., `/admin/*`).~~
  - ~~Ensure this layout is protected and only accessible to users with the `admin` role.~~
- ~~**Step 3.2: User Listing Page (Admin)**~~
  - ~~Display a table of all registered users (from Supabase Auth).~~
  - ~~Show key information (email, user ID, role, creation date).~~
- ~~**Step 3.3: Create User Functionality (Admin)**~~
  - ~~Form for admin to create new users (email, password, assign role - default to `member`).~~
  - ~~Logic to interact with Supabase Auth to create users.~~
- **Step 3.4: Update User Functionality (Admin - Basic)**
  - Ability for admin to change a user's role.
  - (Optional for MVP, can defer: Reset password, change email).
- **Step 3.5: Delete User Functionality (Admin)**
  - Ability for admin to delete a user account from Supabase.
  - Consider implications (e.g., what happens to their uploaded memories? For MVP, memories might remain or be soft-deleted/archived).

---

### Phase 4: Core "Memory" Management (Upload, View, Metadata) (Estimated: 2-3 weeks)

[![Phase 4 Progress](https://geps.dev/progress/0?title=Phase%204)](PLAN.md#phase-4-core-memory-management-upload-view-metadata-estimated-2-3-weeks)

- **Step 4.1: File Upload Component**
  - Create a React component for file uploads (drag-and-drop, file selector).
  - Handle multiple file uploads.
  - Client-side validation for file types and size (preliminary).
- **Step 4.2: Backend Upload Logic (Next.js Route Handler/Server Action)**
  - Create an API endpoint (Route Handler or Server Action) to receive file uploads.
  - Stream/upload file to Cloudflare R2.
    - Ensure proper authentication and authorization for this endpoint.
    - Generate unique filenames/paths for storage.
  - On successful upload to R2, save memory metadata (URL from R2, user ID, initial title if derived from filename, type) to the PostgreSQL database (Supabase).
- **Step 4.3: Memory Display Page/Component**
  - Component to display a single memory (image, video player, audio player).
- **Step 4.4: Memory List/Gallery View**
  - Page to display a chronological stream of the logged-in user's memories.
  - Implement basic pagination or infinite scroll.
- **Step 4.5: Metadata Form & Editing**
  - Form for users to add/edit metadata for an uploaded memory (title, date, description, tags, people).
  - API endpoints (Route Handlers/Server Actions) to save/update metadata in the database.
- **Step 4.6: File Type Handling**
  - Ensure appropriate rendering for different file types (img tags for images, video/audio elements for media).
  - Consider placeholders or icons for unsupported but storable types.

---

### Phase 5: Search & Organization (Estimated: 1-2 weeks)

[![Phase 5 Progress](https://geps.dev/progress/0?title=Phase%205)](PLAN.md#phase-5-search--organization-estimated-1-2-weeks)

- **Step 5.1: Basic Search Input**
  - Add a search bar to the UI.
- **Step 5.2: Backend Search Logic**
  - API endpoint to handle search queries.
  - Implement database queries (PostgreSQL) to search by title, description, tags, people, and date ranges.
  - (Consideration: For MVP, simple `LIKE` queries. For future, full-text search capabilities of PostgreSQL).
- **Step 5.3: Display Search Results**
  - Render search results similar to the main memory list view.
- **Step 5.4: Album/Event Creation**
  - UI for users to create an "Album" or "Event" (name, description).
  - Save album data to the database.
- **Step 5.5: Adding Memories to Albums**
  - Mechanism for users to add existing memories to their albums (e.g., select memories, add to album).
  - Update junction tables in the database.
- **Step 5.6: Viewing Albums**
  - Page to display a list of albums created by the user.
  - Page to display memories within a specific album.
- **Step 5.7: Filtering**
  - Implement filters on the memory stream (e.g., by file type: Photo, Video, Audio; by date).

---

### Phase 6: UI/UX Polish & Basic Styling (Estimated: 1 week - ongoing)

[![Phase 6 Progress](https://geps.dev/progress/0?title=Phase%206)](PLAN.md#phase-6-uiux-polish--basic-styling-estimated-1-week---ongoing)

- **Step 6.1: Apply shadcn/ui & Tailwind CSS Consistently**
  - Ensure all components use the chosen UI library and styling conventions.
  - Focus on a clean, intuitive, and responsive user interface.
- **Step 6.2: Responsive Design**
  - Test and ensure usability on desktop and mobile devices (especially for viewing and upload).
- **Step 6.3: User Feedback & Error Handling**
  - Implement clear loading states, success messages, and error messages for all user interactions (uploads, form submissions, etc.).
- **Step 6.4: Accessibility (Basic)**
  - Keep basic accessibility principles in mind (semantic HTML, keyboard navigation).

---

### Phase 7: Deployment & Testing (Estimated: 1 week - ongoing)

[![Phase 7 Progress](https://geps.dev/progress/0?title=Phase%207)](PLAN.md#phase-7-deployment--testing-estimated-1-week---ongoing)

- **Step 7.1: Comprehensive Manual Testing**
  - Test all user flows: signup (admin-driven), login, upload, view, metadata editing, search, album creation, admin functions.
  - Test on different browsers and devices.
- **Step 7.2: Set Up Basic End-to-End Tests (Optional for MVP, but recommended)**
  - Consider a simple E2E test for critical paths using tools like Playwright or Cypress if time permits.
- **Step 7.3: Performance Review (Basic)**
  - Check for major performance bottlenecks (e.g., slow loading images/videos, slow database queries).
  - Optimize where necessary (e.g., image optimization with `next/image`, database indexing).
- **Step 7.4: Security Review (Basic)**
  - Ensure all API endpoints are properly secured.
  - Check for common web vulnerabilities (XSS, CSRF - Next.js & Supabase provide some protection).
  - Verify R2 bucket permissions.
- **Step 7.5: Finalize Vercel Deployment Settings**
  - Ensure production environment variables are secure.
  - Set up custom domain if applicable (e.g., `reyesvault.com`).

---

### Phase 8: Pre-Launch Checklist & Go-Live (Estimated: 1-2 days)

[![Phase 8 Progress](https://geps.dev/progress/0?title=Phase%208)](PLAN.md#phase-8-pre-launch-checklist--go-live-estimated-1-2-days)

- **Step 8.1: Data Backup Check (Supabase & R2)**
  - Understand and confirm the backup policies of Supabase and Cloudflare R2 for their free/chosen tiers.
  - For MVP, rely on provider-managed backups.
- **Step 8.2: Final Admin Account Setup**
  - Ensure the primary admin account is correctly configured with the 'admin' role.
- **Step 8.3: Documentation (Internal)**
  - Basic notes on how to manage users, deploy updates, and where critical configurations are stored.
- **Step 8.4: Announce to Family & Onboard Initial Users (You!)**
  - Create initial user accounts for family members.
  - Share access and gather initial feedback.
- **Step 8.5: Monitor Application**
  - Use Vercel analytics/logging and Supabase logs to monitor application health and usage.

---

## Key Architectural Decisions (Summary)

- **Full-Stack Next.js:** Leveraging Next.js for both frontend and backend (API Route Handlers & Server Actions) simplifies development and aligns with learning goals.
- **Supabase for BaaS:** Utilizes Supabase for PostgreSQL database hosting and authentication, streamlining backend setup.
- **Cloudflare R2 for Storage:** Chosen for its generous free tier and zero egress fees, ideal for media storage.
- **Vercel Hosting:** Provides seamless CI/CD, optimized for Next.js, and a good developer experience.
- **Integrated Admin UI:** Admin functionalities are part of the main application, protected by role-based access, rather than a separate application/subdomain for MVP simplicity.
- **Strict Typing & Modern UI:** Emphasis on TypeScript for reliability and shadcn/ui + Tailwind for a modern, maintainable UI.

## Future Considerations (Post-MVP)

- **Advanced Search:** Implement PostgreSQL full-text search, AI-powered tagging/search (e.g., image recognition).
- **Social Logins:** Add options for social logins (Google, etc.), while maintaining the allowlist approach.
- **Enhanced Sharing:** Granular sharing options for memories/albums with other users.
- **Bulk Import/Export:** Functionality for users to bulk import existing digital archives or export their data.
- **Video Processing/Transcoding:** Server-side processing for optimizing videos for web streaming.
- **More Robust Backup Strategies:** Custom backup solutions if provider defaults are insufficient long-term.
- **Automated Testing:** More comprehensive unit, integration, and E2E testing.
- **Mobile Native App:** Potential for native mobile apps for an even better mobile experience.
- **Detailed Audit Logs:** More comprehensive logging for admin actions and user activity.
- **Two-Factor Authentication (2FA).**

## Development Best Practices

- **TypeScript First:** Utilize strict TypeScript for all code.
- **Regular Commits:** Meaningful, atomic commits to Git.
- **CI/CD:** Leverage Vercel's CI/CD for automated builds, previews, and deployments on every push to main/PRs.
- **Code Reviews:** (Self-review for solo developer) Critically review code before merging.
- **Environment Variables:** Securely manage all secrets and configurations using environment variables.
- **Component-Based Architecture:** Build reusable UI components.
- **Scalability & Maintainability:** Keep these principles in mind during development, even for an MVP.
