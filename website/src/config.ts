/**
 * Release configuration. Everything here is injected at build time from
 * environment variables (see .env.example and WEBSITE_ARCHITECTURE.md).
 * Nothing secret belongs here: these values are public by design.
 *
 * Note: this project is built with Vite, so the public prefix is VITE_
 * (the Next.js equivalent would be NEXT_PUBLIC_CHROME_STORE_URL).
 */
const clean = (v: string | undefined): string => (v ?? "").trim();

/** The genuine Chrome Web Store listing URL. Empty until the listing is published. */
export const CHROME_STORE_URL = clean(import.meta.env.VITE_CHROME_STORE_URL);
/** Optional HTTPS endpoint that accepts POST {email} for early-access sign-ups. */
export const EARLY_ACCESS_ENDPOINT = clean(import.meta.env.VITE_EARLY_ACCESS_ENDPOINT);
/** Optional verified contact address. Not displayed unless configured. */
export const CONTACT_EMAIL = clean(import.meta.env.VITE_CONTACT_EMAIL);
/** Only set when the released version has been verified. */
export const RELEASE_VERSION = clean(import.meta.env.VITE_RELEASE_VERSION);

export const IS_PUBLISHED = CHROME_STORE_URL.length > 0;
