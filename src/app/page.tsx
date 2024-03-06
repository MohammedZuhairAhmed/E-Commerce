import Image from 'next/image';
import HeroBanner from '@/components/HeroBanner';

export default function Home() {

  let heroBannerProps: HeroBannerProps;

  heroBannerProps = {
    image: "https://images.contentstack.io/v3/assets/blt38d2fd39db963862/blt7a436d97ab4ccce2/65e76c90ed466105c8787cea/banner-w_o_barcode.jpg",
  };
  return (
    <main>
      <HeroBanner params={heroBannerProps}/>
    </main>
  );
}
