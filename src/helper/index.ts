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
    products: {
      productData: products,
    },
  };
};

export const getProductRes = async () => {
  const query1 = allEntriesQuery('products');
  const query2 = allEntriesQuery('categories');

  const res1 = await query1.includeCount().toJSON().find();
  const res2 = await query2.toJSON().find();
  const categories = res2[0][0].categories;

  return {
    categories,
    productData: res1[0],
  };
};

export const getProductByCategory = async (category: string) => {
  const query = allEntriesQuery('products');

  const res = await query
    .includeCount()
    .toJSON()
    .where('category', category)
    .find();
  return {
    products: res[0],
  };
};

export const getProductByID = async (uid: string) => {
  const query = singleEntryQueryWithUID('products', uid);

  const result = (await query.toJSON().fetch()) as ProductProps;

  return {
    product: result,
  };
};
