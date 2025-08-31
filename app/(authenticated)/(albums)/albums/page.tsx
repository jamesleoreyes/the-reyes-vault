import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Albums'
}

export default async function Page() {
  return (
    <h1>Albums page</h1>
  )
}