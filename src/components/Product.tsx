import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

import styles from './Product.module.css';

export default function Product({ params }: { params: Product }) {
  const product = params.product;

  return (
    <>
      <div className="container my-5 py-2">
        <div className="row">
          <div
            className="col-md-6 col-sm-12 pt-3"
            style={{ textAlign: 'center', margin: 'auto' }}
          >
            <Image
              className="img-fluid"
              src={String(product.image.url + '?width=400&height=400')}
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className={`text-uppercase ${styles.purple}`}>
              {product.category}
            </h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rating} <FaStar />
            </p>
            <h3 className="display-6  my-4">$ {product.price}</h3>
            <p className="lead">{product.description}</p>
            <button className="btn btn-outline-dark">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
