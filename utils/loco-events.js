export function bindLocoCallLogger() {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return () => {}
  }

  const handleLocoCall = (event) => {
    console.log('triggered', event.detail)
  }

  window.addEventListener('LocoCall', handleLocoCall)

  return () => {
    window.removeEventListener('LocoCall', handleLocoCall)
  }
}
