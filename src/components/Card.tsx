import Link from 'next/link';
import styles from './Card.module.css';
import Image from 'next/image';
import { AiFillThunderbolt } from 'react-icons/ai';
import { TbShoppingCartBolt } from 'react-icons/tb';

export default function Card({
  uid,
  title,
  description,
  rating,
  price,
  image,
  category,
  redirectionLink,
}: CardProps) {
  return (
    <Link
      href={`/${redirectionLink}/${uid}`}
      style={{ textDecoration: 'none' }}
    >
      <div className={`card-with-image border-accent ${styles.cardWidth}`}>
        <div className="card cs-resource h-100">
          <div className="card-wrap">
            {category && category.length > 0 && (
              <div className="card-tag">
                <p className="card-text body-4 p-2">{category}</p>
              </div>
            )}
            {typeof image === 'object' && image.url && (
              <div className="card-img-top" style={{ textAlign: 'center' }}>
                <Image src={image.url} alt="img" width={300} height={300} />
              </div>
            )}
          </div>
          <div className={`card-body ${styles.cardBody}`}>
            <h3 className={`body-5 fw-bold mb-4 ${styles.cardTitle}`}>
              {title}
            </h3>
            <p className={`${styles.cardDescription}`}>{description}</p>
            <div className={`${styles.priceTag}`}>
              <p>$ {price}</p>
            </div>
          </div>
          <div className={`card-footer pb-4 pt-0 ${styles.cardFooter}`}>
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
      </div>
    </Link>
  );
}
