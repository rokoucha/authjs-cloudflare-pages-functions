/// <reference types="@cloudflare/workers-types" />

interface Env {
  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
  AUTH_SECRET: string;
  AUTH_TRUST_HOST: string;
}
