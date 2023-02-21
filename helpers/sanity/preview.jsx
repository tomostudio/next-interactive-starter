import { definePreview } from 'next-sanity/preview'
import { projectId, dataset } from './sanity.client'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}
export const usePreview = definePreview({
  projectId: 'hdejj5sl',
  dataset: 'production',
  onPublicAccessOnly,
})
