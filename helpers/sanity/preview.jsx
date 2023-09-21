import { definePreview } from 'next-sanity/preview'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}
export const usePreview = definePreview({
  projectId: 'hdejj5sl',
  dataset: 'production',
  onPublicAccessOnly,
})
