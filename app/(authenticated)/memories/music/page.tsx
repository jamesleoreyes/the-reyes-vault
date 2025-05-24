import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Music'
}

export default async function Page() {
  return (
    <h1>Music page</h1>
  )
}