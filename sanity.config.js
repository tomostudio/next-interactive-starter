/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
// import deskStructure from "deskStructure";
import { schemaTypes } from "./sanity/schemas";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import deskStructure from './sanity/deskStructure';
export default defineConfig({
  title: "Sanity Starter",
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    vercelDeployTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
