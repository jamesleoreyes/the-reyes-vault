export const config = {
  app: {
    isDemoMode: process.env['NEXT_PUBLIC_DEMO_MODE']?.toLowerCase() === 'true',
    isDemoModeEnabled: process.env['NEXT_PUBLIC_DEMO_MODE_ENABLED']?.toLowerCase() === 'true'
  },
  url: {
    turnstile: {
      siteKey: process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY']
    }
  }
}