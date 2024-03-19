import { getHomeRes, getProductRes } from '@/helper';
import CardsGrid from '@/components/CardsGrid';

export default async function Products() {
  let dataLoaded = false;
  let data;

  try {
    data = (await getProductRes()) as ProductResProps;
    dataLoaded = true;
  } catch (err) {
    console.error(err);
  }

  return (
    <main>
      {dataLoaded && data?.productData && (
        <CardsGrid
          params={data.productData}
          title="Products"
          override
          redirectionLink="product"
        />
      )}
    </main>
  );
}
