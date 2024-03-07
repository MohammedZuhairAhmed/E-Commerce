type HeaderProps = {
  logo: Image;
  navbar: Link[];
  button: Button[];
};

type Button = {
  title: string;
  href: string;
};

type Link = {
  title?: string;
  href?: url;
};

type Image = {
  filename?: string;
  url?: string;
};

type List = {
  label?: string;
  page_reference: [PageRef];
  href?: string;
};
type PageRef = {
  title: string;
  url: string;
};

type HeroBannerProps = {
  image: string;
};
