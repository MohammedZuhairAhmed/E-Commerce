import { getEntry } from '@/contentstack-sdk';

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
