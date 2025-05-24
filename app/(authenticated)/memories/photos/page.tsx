import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Photos'
}

export default async function Page() {
  return (
    <h1>Photos page</h1>
  )
}