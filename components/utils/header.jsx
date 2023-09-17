import Container from "@/components/utils/container";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="py-4 bg-gray-200 mb-4 md:mb-6 xl:mb-8 fixed top-0 left-0 right-0 w-full z-10"
      data-scroll
      data-scroll-sticky
      data-scroll-target="#scroll-container"
    >
      <Container>
        <div className="flex flex-wrap">
          <Link
            href="/"
            className="mb-1 md:mb-0"
          >
            Next x Tailwind x Motion x Locomotive
          </Link>

          <nav className="ml-auto flex space-x-3 w-full text-sm md:text-base md:w-auto">
            <Link href="/">
              Home
            </Link>

            <Link
              href="/about"
            >
              About
            </Link>
            <Link
              href="/notion-post"
            >
              Notion Post
            </Link>
            <Link
              href="/sanity-post"
            >
              Sanity Post
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
