import { notFound } from 'next/navigation'
import dbConnect from '@/lib/db'
import BlogPost from '@/models/BlogPost'
import Link from 'next/link'
import { FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  await dbConnect()
  const posts = await BlogPost.find({ published: true })
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  await dbConnect()
  const post = await BlogPost.findOne({ slug: slug, published: true })
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Pawsome Pals Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  await dbConnect()
  
  const post = await BlogPost.findOne({ slug: slug, published: true })
  
  if (!post) {
    notFound()
  }

  // Update view count
  await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } })

  // Get related posts
  const relatedPosts = await BlogPost.find({
    _id: { $ne: post._id },
    published: true,
    $or: [
      { tags: { $in: post.tags } }
    ]
  }).limit(3)

  const shareUrl = `${process.env.NEXTAUTH_URL}/blog/${post.slug}`

  // Convert Mongoose documents to plain objects
  const postData = JSON.parse(JSON.stringify(post))
  const relatedPostsData = JSON.parse(JSON.stringify(relatedPosts))

  return (
    <article className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-8 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <time>{formatDate(postData.createdAt)}</time>
              <span>•</span>
              <span>{postData.views} views</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={postData.featuredImage} 
              alt={postData.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {postData.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />

          {/* Share Buttons */}
          <div className="border-t border-b py-6 mb-12">
            <p className="text-gray-600 mb-4">Share this article:</p>
            <div className="flex space-x-4">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postData.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPostsData.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPostsData.map((relatedPost) => (
                  <Link 
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug}`}
                    className="card hover:shadow-xl transition-shadow"
                  >
                    <img 
                      src={relatedPost.featuredImage} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(relatedPost.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}