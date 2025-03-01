const config = {
  ENV: `${import.meta.env.VITE_ENV}`,
  SHA: `${import.meta.env.VITE_SHA}`,
  API_DOMAIN: `${import.meta.env.VITE_API_DOMAIN}`,
  API_HOST: `${import.meta.env.VITE_API_DOMAIN}`.includes("localhost")
    ? `http://${import.meta.env.VITE_API_DOMAIN}`
    : `https://${import.meta.env.VITE_API_DOMAIN}`,
  WS_DOMAIN: `${import.meta.env.VITE_WS_DOMAIN}`,
  WS_HOST: `wss://${import.meta.env.VITE_WS_DOMAIN}`,
  AUTH_DOMAIN: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  AUTH_HOST: `https://${import.meta.env.VITE_AUTH_DOMAIN}`,
  AUTH_CLIENT_ID: `${import.meta.env.VITE_AUTH_CLIENT_ID}`,
};

export default config;
