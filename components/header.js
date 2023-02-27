import FancyLink from "@/components/fancyLink";
import Container from "@/components/container";

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
          <FancyLink
            destination="/"
            a11yText="Navigate to the home page"
            extraClasses="mb-1 md:mb-0"
          >
            Next x Tailwind x Motion x Locomotive
          </FancyLink>

          <nav className="ml-auto flex space-x-3 w-full text-sm md:text-base md:w-auto">
            <FancyLink destination="/" a11yText="Navigate to the home page">
              Home
            </FancyLink>

            <FancyLink
              destination="/about"
              a11yText="Navigate to the about page"
            >
              About
            </FancyLink>
            <FancyLink
              destination="/notion-post"
              a11yText="Navigate to the about page"
            >
              Notion Post
            </FancyLink>
            <FancyLink
              destination="/sanity-post"
              a11yText="Navigate to the about page"
            >
              Sanity Post
            </FancyLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
