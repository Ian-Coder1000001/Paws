import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import LatestReviews from '@/components/home/LatestReviews'
import RecentBlogs from '@/components/home/RecentBlogs'
import QuickContact from '@/components/home/QuickContact'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <LatestReviews />
      <RecentBlogs />
      <QuickContact />
    </>
  )
}