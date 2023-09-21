import Container from '@/components/container'

export default function Footer() {
  return (
    <footer className="mb-4">
      <Container>
        <div className="border-t border-black py-4">
          <div className="flex flex-wrap text-xs">
            <div className="flex space-x-1 mb-1 md:mb-0">
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500 focus:text-gray-500">MIT License</a>

              <span className="block">&bull;</span>

              <span className="block"><a href="https://github.com/tomostudio/next-interactive-starter" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500 focus:text-gray-500">Github</a></span> </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}