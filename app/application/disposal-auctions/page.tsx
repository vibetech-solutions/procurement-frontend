"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DisposalAuctionsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/application/disposal-auctions/internal')
  }, [router])

  return null
}
