/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_FRONTEND_ORIGIN: string
    readonly NEXT_PUBLIC_API_SERVER: string
    readonly NEXT_PUBLIC_SITE_NAME: string
  }
}
