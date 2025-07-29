// FILE: middleware.js

import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to login page
        if (pathname === '/admin/login') {
          return true
        }

        // Allow access to API auth routes
        if (pathname.startsWith('/api/auth')) {
          return true
        }

        // Protect admin routes
        if (pathname.startsWith('/admin')) {
          return token?.isAdmin === true
        }

        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}

