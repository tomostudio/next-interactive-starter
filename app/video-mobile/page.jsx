// import sample from '@/public/assets/sample.mp4'
import sample from '@/public/assets/image.png'

const Page = () => {
  return (
    <div className="w-full h-[200vh] flex flex-col">
      <div>
        <video autoPlay muted playsInline loop>
          <source src="/assets/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default Page
