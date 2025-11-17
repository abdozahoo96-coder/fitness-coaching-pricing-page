/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MYPOS_CLIENT_ID: string;
  readonly VITE_MYPOS_CLIENT_SECRET: string;
  readonly VITE_MYPOS_API_URL: string;
  readonly VITE_MYPOS_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
