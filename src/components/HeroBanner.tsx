export default function HeroBanner() {
  return (
    <div className="container-fluid d-flex pt-7">
      <div className="container">
        <div
          id="carousel"
          className="carousel slide carousel-dark carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="10000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="img-fluid"
                src="https://ui.contentstack.com/depictions/Stacks.png"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                className="img-fluid"
                src="https://ui.contentstack.com/depictions/Workflow.png"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                className="img-fluid"
                src="https://ui.contentstack.com/depictions/Workflow_2.png"
                alt=""
              />
            </div>
          </div>

          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

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
