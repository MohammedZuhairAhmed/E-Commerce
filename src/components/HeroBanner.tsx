/* eslint-disable @next/next/no-img-element */
import styles from './HeroBanner.module.css';

{
  /* banner is responsive and object-fit is cover */
}
export default function HeroBanner({ params }: { params: HeroBannerProps }) {
  return (
    <div
      // className={`container-fluid d-flex pb-0 pe-0 ps-0 pt-9 ${styles.heroBannerRes}`}
      className={`container-fluid d-flex pb-0 pe-0 ps-0 pt-9`}
      id="home"
    >
        <h1>ji</h1>
    </div>
  );
}
