'use client'

import { useEffect, useState } from 'react'

const Page = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Function to handle the 'loadeddata' event of the video element
    const handleVideoLoad = () => {
      setVideoLoaded(true);
    };

    // Get the video element
    const videoElement = document.querySelector('video');

    // Check if the video is already loaded (in case it's cached)
    if (videoElement?.readyState >= 3) {
      setVideoLoaded(true);
    } else {
      // Add an event listener to listen for the 'loadeddata' event
      videoElement?.addEventListener('loadeddata', handleVideoLoad);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      videoElement?.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, []);

  return (
    <div className="w-full h-[200vh] flex flex-col">
      {!videoLoaded && (
        <div className="w-full h-screen flex justify-center items-center">
          <span>Loading...</span>
        </div>
      )}
      <div
        className={`w-full h-screen ${videoLoaded ? 'visible' : 'invisible'}`}
      >
        <video autoPlay muted playsInline loop>
          <source src="/assets/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default Page
