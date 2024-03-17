// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
// const envConfig = process.env.CONTENTSTACK_API_KEY
//   ? process.env
//   : publicRuntimeConfig;
// const { BASE_URL } = envConfig;
import {
  getEntry,
  getEntryByUrl,
  singleEntryQueryWithUID,
  allEntriesQuery,
} from '@/contentstack-sdk';

type HomeResponse = {
  sections: Array<{
    home_banner?: { banner: Array<Image> };
    home_products?: { reference: Array<any> };
  }>;
};

export const getHeaderRes = async () => {
  const res = (await getEntry({
    contentTypeUid: 'header_field_1',
    referenceFieldPath: ['navbar.reference'],
    jsonRtePath: undefined,
  })) as HeaderProps[][];

  const {
    logo: { url: logoUrl } = {},
    navbar: navbarData = [] as any[],
    button: buttonData = [] as any[],
  } = res[0][0];

  const navigationLinks = navbarData.map((navItem: { link?: Link }) => ({
    title: navItem.link?.title,
    href: navItem.link?.href,
  }));

  const buttonLinks = buttonData.map((buttonItem: Button) => ({
    title: buttonItem.title,
    href: buttonItem.href,
  }));

  return {
    logo: {
      url: logoUrl,
    },
    navbar: navigationLinks,
    button: buttonLinks,
  };
};

export const getHomeRes = async (entryUrl: string) => {
  const res = (await getEntryByUrl({
    contentTypeUid: 'reffered_page_1',
    entryUrl,
    referenceFieldPath: ['sections.home_products.reference'],
    jsonRtePath: undefined,
  })) as HomeResponse[];

  const { sections: sectionData = [] as any[] } = res[0];

  const banners = sectionData.flatMap((section) =>
    section.home_banner?.banner !== undefined ? section.home_banner.banner : [],
  );

  const products = sectionData.flatMap((section) =>
    section.home_products?.reference !== undefined
      ? section.home_products?.reference
      : [],
  );

  return {
    banners,
    products,
  };
};

export const getProductRes = async () => {
  const query = allEntriesQuery('products');

  const result = await query.toJSON().find();
  const res = await fetch(`${process.env.BASE_URL}/api/product/filteredList`, {
    method: 'POST',
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data);
};

export const getProductByID = async (uid: string) => {
  const query = singleEntryQueryWithUID('products', uid);

  const result = (await query.toJSON().fetch()) as ProductProps;

  return result;
};
