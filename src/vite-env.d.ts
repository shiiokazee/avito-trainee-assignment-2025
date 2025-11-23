// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ViteTypeOptions {}

interface ImportMetaEnv {
  readonly API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
