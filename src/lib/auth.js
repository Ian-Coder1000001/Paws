// FILE: src/lib/auth.js

import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from './db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await dbConnect()
          
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password')

          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin || false,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // If logging in and user should go to admin, redirect there
      if (url.startsWith(baseUrl + '/admin/login')) {
        return baseUrl + '/admin/dashboard'
      }
      // If URL is relative, make it absolute
      if (url.startsWith('/')) {
        return baseUrl + url
      }
      // If URL is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // Otherwise redirect to base URL
      return baseUrl
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

// Export the hashPassword function that's being imported elsewhere
export async function hashPassword(password) {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}


// // FILE: src/lib/auth.js

// import CredentialsProvider from 'next-auth/providers/credentials'
// import dbConnect from './db'
// import User from '@/models/User'
// import bcrypt from 'bcryptjs'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           await dbConnect()
          
//           const user = await User.findOne({ 
//             email: credentials.email.toLowerCase() 
//           }).select('+password')

//           if (!user) {
//             return null
//           }

//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           )

//           if (!isPasswordValid) {
//             return null
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             isAdmin: user.isAdmin || false,
//           }
//         } catch (error) {
//           console.error('Auth error:', error)
//           return null
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.isAdmin = user.isAdmin
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.isAdmin = token.isAdmin
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',
// }

// // Export the hashPassword function that's being imported elsewhere
// export async function hashPassword(password) {
//   const saltRounds = 12
//   return await bcrypt.hash(password, saltRounds)
// }



// // FILE: src/lib/auth.js

// import CredentialsProvider from 'next-auth/providers/credentials'
// import dbConnect from './db'
// import User from '@/models/User'
// import bcrypt from 'bcryptjs'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           await dbConnect()
          
//           const user = await User.findOne({ 
//             email: credentials.email.toLowerCase() 
//           }).select('+password')

//           if (!user) {
//             return null
//           }

//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           )

//           if (!isPasswordValid) {
//             return null
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             isAdmin: user.isAdmin || false,
//           }
//         } catch (error) {
//           console.error('Auth error:', error)
//           return null
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.isAdmin = user.isAdmin
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.isAdmin = token.isAdmin
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',
// }



