import { getHomeRes, getProductRes } from '@/helper';
import CardsGrid from '@/components/CardsGrid';

export default async function Products() {
  let homeData;
  let dataLoaded = false;
  let productData;

  try {
    homeData = (await getHomeRes('/')) as HomeProps;
    productData = await getProductRes();
    dataLoaded = true;
  } catch (err) {
    console.error(err);
  }

  return (
    <main>
      {dataLoaded && homeData?.products && (
        <CardsGrid
          params={homeData.products}
          title="Products"
          override
          redirectionLink="product"
        />
      )}
    </main>
  );
}
