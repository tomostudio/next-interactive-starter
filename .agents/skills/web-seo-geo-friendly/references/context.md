# Context: Web SEO + GEO

## Folder Target

```
apps/web/app/
├── sitemap.ts
├── robots.ts
└── (public)/
    └── {page}/
        └── page.tsx    → generateMetadata + JSON-LD
```

## Pattern generateMetadata

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Brand',
  description: 'Deskripsi 150-160 karakter',
  alternates: { canonical: 'https://example.com/page' },
  openGraph: {
    type: 'website',
    title: 'Page Title | Brand',
    description: 'Deskripsi OG',
    url: 'https://example.com/page',
    images: [{ url: 'https://example.com/og/page.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | Brand',
    description: 'Deskripsi Twitter',
    images: ['https://example.com/og/page.jpg'],
  },
}
```

## Pattern JSON-LD

```tsx
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Company Name',
    url: 'https://example.com',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
```

## Pattern Sitemap

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ]
}
```
