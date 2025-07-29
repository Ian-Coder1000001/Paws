// FILE: src/components/blog/BlogCard.js

import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { FaArrowRight, FaEye } from 'react-icons/fa'

export default function BlogCard({ post }) {
  return (
    <article className="card group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <time>{formatDate(post.createdAt)}</time>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <FaEye className="mr-1" />
              {post.views} views
            </span>
          </div>
          
          <h2 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors line-clamp-2 min-h-[3.5rem]">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
            
            <span className="text-primary-500 font-semibold inline-flex items-center group-hover:gap-2 transition-all">
              Read More
              <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}


