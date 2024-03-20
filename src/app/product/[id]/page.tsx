import { getProductByID } from '@/helper';
import Product from '@/components/Product';

type Props = {
  params: {
    id: string;
  };
};

export default async function productPage({ params }: Props) {
  let dataLoaded = false;
  let data;
  try {
    data = (await getProductByID(params.id)) as Product;
    dataLoaded = true;
  } catch (err) {
    console.error(err);
  }
  return <main>{dataLoaded && data && <Product params={data} />}</main>;
}
