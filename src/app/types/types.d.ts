type HeaderProps = {
  logo: string;
  navigationLinks: Array<{ title: string; href: string }>;
  socialmediaLinks: Array<{ title: string; href: string }>;
};

type SocialMediaLink = {
  href: string;
  title: string;
};

type SocialMediaLinksProps = {
  socialmediaLinks: SocialMediaLink[];
};

type HeroBannerProps = {
  image: string;
};
