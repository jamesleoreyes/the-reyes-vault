import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function Page() {
  return (
    <h1>Profile page</h1>
  )
}