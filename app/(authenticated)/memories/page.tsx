import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Memories'
}

export default async function Page() {
  return (
    <h1>All memories page</h1>
  )
}