// client.js
import {createClient} from '@sanity/client';

export default createClient({
  projectId: 'hdejj5sl', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
});