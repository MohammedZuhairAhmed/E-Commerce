import { getProductByID } from '@/helper';

type Props = {
  params: {
    id: string;
  };
};

export default async function productPage({ params }: Props) {
  try {
    const res = getProductByID(params.id);
  } catch (err) {
    console.error(err);
  }
  return (
    <>
      <div className="pt-7">hi</div>
    </>
  );
}
