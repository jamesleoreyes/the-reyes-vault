import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Notes'
}

export default async function Page() {
  return (
    <h1>Notes page</h1>
  )
}