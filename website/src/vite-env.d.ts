/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHROME_STORE_URL?: string;
  readonly VITE_EARLY_ACCESS_ENDPOINT?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_RELEASE_VERSION?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
