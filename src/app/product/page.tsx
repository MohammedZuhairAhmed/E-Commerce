import { getHomeRes } from '@/helper';
import CardsGrid from '@/components/CardsGrid';

export default async function Products() {
  let homeData;
  let dataLoaded = false;

  try {
    homeData = (await getHomeRes('/')) as HomeProps;
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
          viewAllText="View All Products"
          redirectionLink="product"
        />
      )}
    </main>
  );
}
