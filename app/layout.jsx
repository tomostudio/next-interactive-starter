import Wrapper from './wrapper'
import '@/styles/main.css'

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export default RootLayout
