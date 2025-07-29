import Head from 'next/head'

export default function SEO({
  title = 'Pawsome Pals - For All the Dogs',
  description = 'Professional dog walking, training, and grooming services. We care for your furry friends with love and expertise.',
  keywords = 'dog walking, dog training, dog grooming, pet services, Pawsome Pals',
  image = 'https://ik.imagekit.io/tuwnero7d/pawsome-pals-og.jpg',
  url,
  type = 'website',
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pawsomepals.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Pawsome Pals" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Pawsome Pals" />
    </Head>
  )
}