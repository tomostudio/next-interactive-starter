export default function Description() {
  return (
    <div className="content max-w-3xl space-y-6">
      <p>
        Starter ini menggunakan App Router (`app/`) dan tetap
        mempertahankan integrasi animasi berbasis Framer Motion + GSAP
        ScrollTrigger dengan Locomotive Scroll.
      </p>
      <p>
        Gunakan route `/admin` untuk membuka Sanity Studio, dan kelola metadata
        SEO lewat App Router Metadata API.
      </p>
      <p>
        Untuk mode preview, set `NEXT_PUBLIC_PREVIEW_NO_CRAWL=true` agar robots
        otomatis no-index/no-follow.
      </p>
    </div>
  )
}
