import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemas";

export default defineConfig({
  title: "Sanity Starter",
  basePath: "/admin",

  projectId: "hdejj5sl",
  dataset: "production",

  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
