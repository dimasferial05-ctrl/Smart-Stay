/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Tambahkan variabel env lainnya di sini jika ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
