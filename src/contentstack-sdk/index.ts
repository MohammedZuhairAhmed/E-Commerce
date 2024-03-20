import * as Utils from '@contentstack/utils';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import getConfig from 'next/config';
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from './utils';

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const CONTENTSTACK_API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;

const CONTENTSTACK_ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;

const CONTENTSTACK_API_HOST = process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST;
const CONTENTSTACK_APP_HOST = process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST;
const CONTENTSTACK_LIVE_PREVIEW =
  process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW;

let customHostBaseUrl = CONTENTSTACK_API_HOST as string;
customHostBaseUrl = customHostUrl(customHostBaseUrl);

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: CONTENTSTACK_APP_HOST,
  },
  stackDetails: {
    apiKey: CONTENTSTACK_API_KEY,
    environment: CONTENTSTACK_ENVIRONMENT,
  },
  enable: CONTENTSTACK_LIVE_PREVIEW === 'true',
  ssr: false,
})?.catch((err) => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        },
      );
  });
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where('url', `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
    );
  });
};

export const allEntriesQuery = (contentType: string) => {
  return Stack.ContentType(contentType).Query();
};

export const singleEntryQueryWithUID = (contentType: string, uid: string) => {
  return Stack.ContentType(contentType).Entry(uid);
};
