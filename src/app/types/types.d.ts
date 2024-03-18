type HeaderProps = {
  logo: Image;
  navbar: Link[];
  button: Button[];
};

type HomeProps = {
  banners: Image[];
  products: ProductResProps;
};

type ProductResProps = {
  productTags?: Array<string>;
  productData: ProductProps[];
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

type ProductProps = {
  uid: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  image: Image;
  tags: string;
};

type CardsGridProps = {
  params: ProductResProps;
  title: string;
  viewAllText?: string;
  redirectionLink: string;
  override?: boolean;
};

type CardProps = {
  uid: ProductProps['uid'] | string;
  title: ProductProps['title'] | string;
  description: ProductProps['description'] | string;
  rating: ProductProps['rating'] | string;
  price: ProductProps['price'] | string;
  image: ProductProps['image'] | string;
  tags: ProductProps['tags'] | string;
  redirectionLink: string;
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
