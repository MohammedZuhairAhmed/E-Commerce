import Image from 'next/image';

export default function HeroBanner({
  params,
}: {
  params: HomeProps['banners'];
}) {
  const urls = params.map((obj) => {
    let val = obj.url + '?width=1510&height=500';
    return String(val);
  });

  const carouselInnerImages = urls.map((url, index) => {
    return (
      <div
        key={index}
        className={`carousel-item ${index == 0 ? 'active' : ''}`}
      >
        <Image
          src={url}
          alt=""
          className="img-fluid"
          layout="responsive"
          width={1510}
          height={500}
        />
      </div>
    );
  });

  const carouselIndicators = urls.map((url, index) => {
    return (
      <button
        key={index}
        type="button"
        data-bs-target="#carousel"
        data-bs-slide-to={String(index)}
        className={`${index == 0 ? 'active' : ''}`}
        aria-current={index == 0 ? 'true' : undefined}
        aria-label={`slide ${index + 1}`}
      ></button>
    );
  });

  return (
    <div
      className="container-fluid d-flex pt-6"
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className="container-fluid"
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <div
          id="carousel"
          className="carousel slide carousel-dark carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="10000"
        >
          <div className="carousel-inner">{carouselInnerImages}</div>

          <div className="carousel-indicators">{carouselIndicators}</div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <svg
              width="15"
              height="23"
              viewBox="0 0 15 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.8 2.675-9.148 8.71 9.148 8.708-2.816 2.676L0 11.384 11.984 0 14.8 2.675Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <svg
              width="16"
              height="23"
              viewBox="0 0 16 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m.5 20.094 9.147-8.71L.5 2.677 3.316 0 15.3 11.385 3.316 22.769.5 20.094Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
