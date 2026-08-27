# Pawsome Pals — Pet Care & Content Management Platform

A modern full-stack pet care website and content management platform built with **Next.js**, **MongoDB**, **Tailwind CSS**, and cloud-based media services.

Pawsome Pals combines a public-facing pet care website with a secure administrative dashboard that allows authorized users to manage website content, services, blog posts, reviews, gallery images, team information, and other dynamic content.

## 🚀 Live Demo

**Live Application:**
[https://pawsomepals2025.vercel.app/](https://pawsomepals2025.vercel.app/)

---

## 📌 Project Purpose

Pawsome Pals was developed as a modern digital platform for a pet care business, combining an engaging customer-facing website with a flexible content management system.

The public website allows visitors to:

* Learn about the business
* Explore available pet care services
* Browse the gallery
* Read blog articles
* View customer reviews
* Learn about the team
* Submit inquiries through the contact page
* Subscribe to newsletters

Behind the public website is an administrative platform that allows authorized administrators to manage and update the site's content without having to modify the application code directly.

This architecture makes the platform suitable for a growing pet care business that needs to continuously update its services, content, images, reviews, and team information.

---

# ✨ Features

## 🐾 Public Website

The customer-facing website provides visitors with an interactive experience for discovering the Pawsome Pals brand and its services.

Available sections include:

* Home
* About
* Services
* Gallery
* Reviews
* Blog
* Contact

The homepage includes dedicated sections for:

* Hero content
* Services preview
* Recent blog posts
* Latest reviews
* Quick contact

---

## 🛁 Services

Visitors can explore the pet care services offered by Pawsome Pals.

The services system supports:

* Service listings
* Service descriptions
* Service cards
* Detailed service modals
* Dynamic service management through the admin dashboard

---

## 📝 Blog

The platform includes a complete blog system.

Visitors can:

* Browse blog posts
* Open individual articles
* Navigate through blog content
* Read detailed posts

The application supports dynamic blog routes using slugs:

```text
/blog/[slug]
```

The admin dashboard provides functionality for managing blog content.

---

## ⭐ Reviews

Customers can view reviews and feedback through the reviews section.

The platform includes:

* Review cards
* Review submission form
* Review statistics
* Latest reviews on the homepage

Reviews can also be managed from the administrative dashboard.

---

## 🖼️ Gallery

The gallery provides a visual showcase of pets, services, and activities.

Features include:

* Responsive image grid
* Individual gallery items
* Image lightbox
* Dynamic gallery management
* Cloud-based image uploads

---

## 👥 Team

The website includes a dedicated team section where visitors can learn more about members of the Pawsome Pals team.

Administrators can manage:

* Team members
* Team descriptions
* Team images
* Team information

---

## 📧 Contact & Newsletter

The platform provides visitors with ways to interact with the business.

### Contact

Visitors can submit inquiries through the contact page.

### Newsletter

The application includes newsletter subscription functionality, allowing visitors to subscribe for future updates.

---

# 🔐 Admin Dashboard

Pawsome Pals includes a dedicated administrative dashboard for managing dynamic website content.

The admin area includes:

```text
/admin/dashboard
/admin/about
/admin/blog
/admin/gallery
/admin/hero
/admin/reviews
/admin/services
/admin/team
```

Administrators can manage different sections of the website from a centralized interface.

### Admin Features

* Admin authentication
* Dashboard overview
* About page management
* Blog management
* Gallery management
* Hero section management
* Reviews management
* Services management
* Team management
* Image uploads
* Rich text editing
* Data tables
* Statistics cards

---

## 📊 Admin Dashboard Components

The admin interface includes reusable components such as:

```text
DataTable
RichTextEditor
StatsCard
AdminSidebar
```

This provides a consistent interface for managing different types of website content.

---

# 🖼️ Media Management

The application includes integrations for cloud-based image management.

The project contains dedicated libraries for:

```text
Cloudinary
ImageKit
```

These services can be used to handle website media and uploaded images without storing large media files directly within the application repository.

The upload API is available through:

```text
/api/upload
```

---

# 🔑 Authentication

Pawsome Pals uses an authentication system to protect the administrative area.

The project includes:

* Admin login
* Authentication context
* Authentication hooks
* Protected admin routes
* Server-side authentication utilities
* NextAuth integration
* Middleware-based route protection

Authentication-related functionality is organized across:

```text
src/context/AuthContext.js
src/hooks/useAuth.js
src/lib/auth.js
```

---

# 🧰 Tech Stack

## Frontend

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Next.js            | Full-stack React framework    |
| React              | User interface                |
| JavaScript         | Application logic             |
| Tailwind CSS       | Styling                       |
| Next.js App Router | Routing and page architecture |

## Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Next.js API Routes | Backend/API functionality |
| Node.js            | Server-side runtime       |
| MongoDB            | Database                  |
| NextAuth           | Authentication            |

## Content & Media

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| MongoDB    | Dynamic content storage               |
| Cloudinary | Image/media management                |
| ImageKit   | Image/media optimization and delivery |

## Deployment

| Technology | Purpose             |
| ---------- | ------------------- |
| Vercel     | Application hosting |

---

# 🏗️ Application Architecture

Pawsome Pals uses a full-stack Next.js architecture where the public website, admin dashboard, API routes, database models, and authentication system are contained within the same application.

```text
                         ┌─────────────────────────┐
                         │      Pawsome Pals       │
                         │        Next.js          │
                         └────────────┬────────────┘
                                      │
                   ┌──────────────────┴──────────────────┐
                   │                                     │
                   ▼                                     ▼
        ┌────────────────────┐                ┌────────────────────┐
        │   Public Website   │                │   Admin Dashboard  │
        │                    │                │                    │
        │ Home               │                │ Dashboard          │
        │ About              │                │ About              │
        │ Services           │                │ Blog               │
        │ Gallery            │                │ Gallery            │
        │ Reviews            │                │ Hero               │
        │ Blog               │                │ Reviews            │
        │ Contact            │                │ Services            │
        └──────────┬─────────┘                │ Team               │
                   │                          └──────────┬─────────┘
                   │                                     │
                   └────────────────┬────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      API Routes      │
                         │                      │
                         │ About                │
                         │ Blog                 │
                         │ Gallery              │
                         │ Hero                 │
                         │ Reviews              │
                         │ Services             │
                         │ Team                 │
                         │ Contact              │
                         │ Newsletter           │
                         │ Upload               │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │       MongoDB        │
                         │                      │
                         │ About                │
                         │ BlogPost             │
                         │ Gallery              │
                         │ Hero                 │
                         │ Review               │
                         │ Service              │
                         │ Team                 │
                         │ User                 │
                         └──────────────────────┘
                                    │
                         ┌──────────▼───────────┐
                         │    Media Services    │
                         │ Cloudinary / ImageKit│
                         └──────────────────────┘
```

---

# 📁 Project Structure

```text
PawsomePals/
│
├── public/
│   └── images/
│       └── logo.png
│
├── scripts/
│   └── init-admin.js
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── admin/
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── dashboard/
│   │   │   ├── gallery/
│   │   │   ├── hero/
│   │   │   ├── login/
│   │   │   ├── reviews/
│   │   │   ├── services/
│   │   │   └── team/
│   │   │
│   │   ├── api/
│   │   │   ├── about/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   ├── hero/
│   │   │   ├── newsletter/
│   │   │   ├── reviews/
│   │   │   ├── services/
│   │   │   ├── team/
│   │   │   └── upload/
│   │   │
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── services/
│   │   ├── setup-admin/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── gallery/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── reviews/
│   │   ├── services/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── useForm.js
│   │
│   ├── lib/
│   │   ├── auth.js
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── imagekit.js
│   │   ├── mongodb.js
│   │   └── utils.js
│   │
│   └── models/
│       ├── About.js
│       ├── BlogPost.js
│       ├── Gallery.js
│       ├── Hero.js
│       ├── Review.js
│       ├── Service.js
│       ├── Team.js
│       └── User.js
│
├── create-admin-simple.js
├── eslint.config.mjs
├── jsconfig.json
├── middleware.js
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

---

# 🗃️ Data Models

The application uses MongoDB models to manage dynamic website content.

## About

Stores information displayed on the business's About page.

## BlogPost

Stores blog articles and their associated content.

Blog posts support dynamic routes using slugs.

## Gallery

Stores gallery image information.

## Hero

Manages content displayed in the website's hero section.

## Review

Stores customer reviews and review-related information.

## Service

Stores information about the pet care services offered by the business.

## Team

Stores information about team members.

## User

Stores administrator account information used for authentication and access control.

---

# 🔌 API Routes

The application uses Next.js API routes to provide CRUD functionality for the site's dynamic content.

### About

```text
/api/about
```

Manages About page content.

### Blog

```text
/api/blog
/api/blog/[id]
```

Provides functionality for creating, retrieving, updating, and deleting blog posts.

### Gallery

```text
/api/gallery
/api/gallery/[id]
```

Manages gallery content and individual gallery items.

### Hero

```text
/api/hero
/api/hero/[id]
```

Manages homepage hero content.

### Reviews

```text
/api/reviews
/api/reviews/[id]
```

Manages customer reviews.

### Services

```text
/api/services
/api/services/[id]
```

Manages pet care services.

### Team

```text
/api/team
/api/team/[id]
```

Manages team member information.

### Contact

```text
/api/contact
```

Handles contact form submissions.

### Newsletter

```text
/api/newsletter
```

Handles newsletter subscriptions.

### Upload

```text
/api/upload
```

Handles media uploads.

---

# ⚙️ Getting Started

## Prerequisites

Before running the project locally, make sure you have:

* Node.js 18 or later
* npm
* Git
* MongoDB or MongoDB Atlas
* Cloudinary account
* ImageKit account if enabled by the application
* Authentication configuration

Check your Node.js version:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

# 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/YOUR_USERNAME/pawsomepals2025.git
```

Navigate into the project:

```bash
cd pawsomepals2025
```

> Replace `YOUR_USERNAME/pawsomepals2025` with your actual GitHub repository URL.

---

# 2. Install Dependencies

Install the project dependencies:

```bash
npm install
```

---

# 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Use the exact environment variable names expected by the project's implementation.

### 🔒 Security

Never commit `.env.local` or other environment files containing secrets.

Add the following to `.gitignore`:

```gitignore
.env
.env.local
.env.production
node_modules/
.next/
```

---

# 4. Configure MongoDB

Create a MongoDB database using either:

* MongoDB locally
* MongoDB Atlas

Add your connection string to:

```env
MONGODB_URI=your_mongodb_connection_string
```

Database connection functionality is contained within the project's `lib` directory.

---

# 5. Create an Administrator

The project includes administrator initialization scripts:

```text
scripts/init-admin.js
create-admin-simple.js
```

Use the appropriate script configured for your environment to create the initial administrator account.

After creating the account, use the admin login page:

```text
/admin/login
```

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 🧪 Testing the Application

After starting the development server, test the main public and administrative workflows.

## Public Website

Verify that the following pages load correctly:

```text
/
 /about
 /services
 /gallery
 /reviews
 /blog
 /contact
```

---

## Blog

1. Open the Blog page.
2. Select a blog post.
3. Verify that the individual article page loads.
4. Confirm that dynamic blog content is displayed correctly.

---

## Services

1. Open the Services page.
2. Browse available services.
3. Open a service.
4. Verify that the service details are displayed.

---

## Gallery

1. Open the Gallery.
2. Select an image.
3. Verify that the lightbox opens.
4. Close the lightbox and continue browsing.

---

## Reviews

1. Open the Reviews page.
2. Review existing customer feedback.
3. Test the review form if enabled.
4. Confirm that valid submissions are processed correctly.

---

## Admin Dashboard

1. Open `/admin/login`.
2. Log in with administrator credentials.
3. Open the dashboard.
4. Test content management sections.
5. Add or edit content.
6. Verify that changes appear on the public website.

---

# 🚀 Deployment

Pawsome Pals is deployed using **Vercel**.

### Production URL

[https://pawsomepals2025.vercel.app/](https://pawsomepals2025.vercel.app/)

For production deployment, configure all required environment variables in the Vercel project settings.

The production environment requires access to the application's external services, including:

```text
MongoDB
Cloudinary
ImageKit
Authentication configuration
```

---

# 🔒 Security Considerations

The application includes authentication and protected administrative functionality.

Production deployments should ensure that:

* Admin credentials are securely stored
* Authentication secrets are kept private
* Database credentials are never exposed to the client
* API routes validate authenticated requests
* Uploaded files are validated
* Environment variables are not committed to Git
* Administrative routes remain protected

Additional security measures such as rate limiting, stronger role-based authorization, input sanitization, and audit logging can be added for production environments.

---

# 📈 Future Improvements

Potential future enhancements include:

* Online appointment booking
* Pet profile management
* Customer accounts
* Online payments
* Service availability scheduling
* Pet care packages
* Advanced blog search
* Blog categories and tags
* Admin analytics dashboard
* Customer inquiry management
* Automated email notifications
* Social media integration
* SEO analytics
* Advanced image optimization
* Role-based admin permissions
* Automated testing

---

# 🧑‍💻 Development Architecture

The project separates the major application responsibilities into several layers.

### Application Pages

The `src/app` directory contains the public pages, administrative pages, and API routes.

```text
src/app/
├── Public Pages
├── Admin Pages
└── API Routes
```

### Reusable Components

The component architecture is organized by functionality:

```text
components/
├── admin/
├── blog/
├── common/
├── gallery/
├── home/
├── layout/
├── reviews/
├── services/
└── ui/
```

This allows common UI elements to be reused throughout the application.

### Hooks & Context

Client-side application behavior is supported through:

```text
hooks/
context/
```

including authentication state, form handling, and debouncing functionality.

### Database Models

Dynamic website content is represented through dedicated MongoDB models:

```text
models/
├── About
├── BlogPost
├── Gallery
├── Hero
├── Review
├── Service
├── Team
└── User
```

### External Services

External integrations are isolated within:

```text
lib/
```

including database, authentication, and media-management functionality.

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

If you intend to distribute or use the project commercially, add an appropriate open-source or proprietary license to the repository.

---

# 👨‍💻 Author

**Ian**

Digital Marketing & Software Development

Built with ❤️ using Next.js, MongoDB, Tailwind CSS, and modern web technologies.

---

## ⭐ Project Highlights

* Full-stack Next.js application
* Pet care business website
* Custom content management system
* Admin dashboard
* Blog management
* Services management
* Gallery management
* Customer reviews
* Team management
* Dynamic hero content
* Contact form
* Newsletter functionality
* Admin authentication
* MongoDB integration
* Cloudinary integration
* ImageKit integration
* Rich text editor
* Responsive UI
* Reusable component architecture
* Next.js App Router
* Tailwind CSS
* Vercel deployment

### 🔗 Live Demo

**[https://pawsomepals2025.vercel.app/](https://pawsomepals2025.vercel.app/)**
