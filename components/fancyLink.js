import Link from 'next/link'

export default function FancyLink({ destination, a11yText, extraClasses, children }) {
  return (
    <Link href={destination} aria-label={a11yText} className={`underline hover:text-gray-500 focus:text-gray-500 ${extraClasses}`}>
      {children}
    </Link>
  )
}