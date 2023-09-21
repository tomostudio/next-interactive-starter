export default function Container({ children }) {
  return(
    <div className="px-6 lg:px-14 max-w-screen-3xl mx-auto w-full">
      {children}
    </div>
  )
}