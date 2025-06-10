declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      AWS_BUCKET_NAME: string;
      AWS_REGION: string;
      AWS_ACCESS_KEYYY: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}

export {}