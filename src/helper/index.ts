import { getEntry, getEntryByUrl } from '@/contentstack-sdk';

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
  })) as {
    sections: Array<{
      home_products?: { reference: Array<any> };
    }>;
  }[];

  const { sections: sectionData = [] as any[] } = res[0];
  const products = sectionData.map((section) => {
    return section.home_products?.reference;
  });

  return {
    products: products[0],
  };
};
