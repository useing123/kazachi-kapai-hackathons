"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

  if (key) {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
    })
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleRouteChange = () => {
      posthog.capture("$pageview")
    }

    window.addEventListener("popstate", handleRouteChange)
    handleRouteChange()

    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  return <>{children}</>
}
