'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { AiFillThunderbolt } from 'react-icons/ai';
import { TbShoppingCartBolt } from 'react-icons/tb';
import { getProductByCategory } from '@/helper';
import Card from './Card';
import Marquee from 'react-fast-marquee';
import styles from './Product.module.css';

export default function Product({ params }: { params: Product }) {
  const product = params.product;
  const [similar, setSimilar] = useState<ProductProps[]>([]);

  const similarProducts = useCallback(async (activeTag: string) => {
    const data = await getProductByCategory(activeTag);
    setSimilar(data.products);
  }, []);

  useEffect(() => {
    similarProducts(product.category);
  }, [product.category, similarProducts]);

  const renderSimilar = similar?.map((product, index) => (
    <Card key={index} {...product} redirectionLink="product" override />
  ));

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
            <p className="lead" style={{ textAlign: 'justify' }}>
              {product.description}
            </p>

            <button className="btn btn-outline-primary mx-2">
              <span
                className="cs-icon icon-size-auto"
                style={{ paddingRight: '5px', paddingBottom: '2px' }}
              >
                <AiFillThunderbolt />
              </span>
              Buy now
            </button>
            <button className="btn btn-primary mx-2">
              <span
                className="cs-icon icon-size-auto"
                style={{ paddingRight: '5px', paddingBottom: '2px' }}
              >
                <TbShoppingCartBolt />
              </span>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="row">
          {similar && <Marquee>{renderSimilar}</Marquee>}
        </div>
      </div>
    </>
  );
}
