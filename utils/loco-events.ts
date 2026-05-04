// @ts-nocheck
export function bindLocoCallLogger() {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return () => {}
  }

  const handleLocoCall = () => {}

  window.addEventListener("LocoCall", handleLocoCall)

  return () => {
    window.removeEventListener("LocoCall", handleLocoCall)
  }
}
