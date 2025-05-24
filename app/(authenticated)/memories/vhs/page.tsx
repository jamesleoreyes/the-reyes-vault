import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'VHS Tapes'
}

export default async function Page() {
  return (
    <h1>VHS page</h1>
  )
}