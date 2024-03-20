import { Config, Region, Stack } from 'contentstack';

const CONTENTSTACK_API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const CONTENTSTACK_DELIVERY_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const CONTENTSTACK_ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
const CONTENTSTACK_BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH;
const CONTENTSTACK_REGION = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!CONTENTSTACK_API_KEY &&
    !!CONTENTSTACK_DELIVERY_TOKEN &&
    !!CONTENTSTACK_ENVIRONMENT
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
