// @ts-nocheck
"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export default function StudioPageContent() {
  return <NextStudio config={config} />
}
