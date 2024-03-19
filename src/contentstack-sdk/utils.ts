import { Config, Region, LivePreview, Stack } from 'contentstack';

const CONTENTSTACK_API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const CONTENTSTACK_DELIVERY_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const CONTENTSTACK_ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
const CONTENTSTACK_BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH;
const CONTENTSTACK_REGION = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION;
const CONTENTSTACK_MANAGEMENT_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENTSTACK_API_HOST = process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST;
const CONTENTSTACK_APP_HOST = process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST;
const CONTENTSTACK_LIVE_PREVIEW =
  process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!CONTENTSTACK_API_KEY &&
    !!CONTENTSTACK_DELIVERY_TOKEN &&
    !!CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!CONTENTSTACK_LIVE_PREVIEW &&
    !!CONTENTSTACK_MANAGEMENT_TOKEN &&
    !!CONTENTSTACK_API_HOST &&
    !!CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): Region => {
  let region = 'US' as keyof typeof Region;
  if (!!CONTENTSTACK_REGION && CONTENTSTACK_REGION !== 'us') {
    region = CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      '-',
      '_',
    ) as keyof typeof Region;
  }
  return Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error(
      'Your LP config is set to true. Please make you have set all required LP config in .env',
    );
  return {
    management_token: CONTENTSTACK_MANAGEMENT_TOKEN as string,
    enable: CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: CONTENTSTACK_API_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error('Please set you .env file before running starter app');
  const stackConfig: Config = {
    api_key: CONTENTSTACK_API_KEY as string,
    delivery_token: CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: CONTENTSTACK_BRANCH || 'main',
  };
  if (CONTENTSTACK_LIVE_PREVIEW === 'true') {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace('api', 'cdn');
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === 'US') {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
