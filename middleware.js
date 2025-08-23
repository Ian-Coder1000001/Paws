// // FILE: middleware.js

// import { withAuth } from 'next-auth/middleware'

// export default withAuth(
//   function middleware(req) {
//     // Add any additional middleware logic here if needed
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl

//         // Allow access to login page
//         if (pathname === '/admin/login') {
//           return true
//         }

//         // Allow access to API auth routes
//         if (pathname.startsWith('/api/auth')) {
//           return true
//         }

//         // Protect admin routes
//         if (pathname.startsWith('/admin')) {
//           return token?.isAdmin === true
//         }

//         // Allow all other routes
//         return true
//       },
//     },
//   }
// )

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/api/admin/:path*'
//   ]
// }




// FILE: middleware.js

import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    console.log('Middleware running for:', req.nextUrl.pathname)
    console.log('Token:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        console.log('Checking authorization for:', pathname)
        console.log('Token isAdmin:', token?.isAdmin)

        // Always allow access to login page
        if (pathname === '/admin/login') {
          return true
        }

        // Always allow access to setup page
        if (pathname === '/setup-admin') {
          return true
        }

        // Allow access to API auth routes
        if (pathname.startsWith('/api/auth')) {
          return true
        }

        // For admin routes, check if user is admin
        if (pathname.startsWith('/admin')) {
          // Must have token and be admin
          return !!token && token.isAdmin === true
        }

        // For admin API routes, check if user is admin  
        if (pathname.startsWith('/api/admin')) {
          return !!token && token.isAdmin === true
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