/// <reference types="vite/client" />

interface Window extends Window {
  App: {
    ENV: string;
    SHA: string;
    API_HOST: string;
  };
}
