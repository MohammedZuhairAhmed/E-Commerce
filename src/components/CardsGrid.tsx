'use client';

import { useState } from 'react';
import Card from './Card';
import styles from './CardsGrid.module.css';

export default function CardsGrid({
  params,
  title,
  viewAllText,
  override,
  redirectionLink,
}: CardsGridProps) {
  const [showAll, setShowAll] = useState(override || false);
  const [activeTag, setActiveTag] = useState('all');

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const cardsToShow = showAll ? params : params.slice(0, 3);
  const showViewAll = params.length > 3;

  const uniqueTags = new Set();
  cardsToShow.forEach((prod) => uniqueTags.add(prod.tags[0]));

  const handleAllClick = () => {
    setActiveTag('all');
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const filterButtons = Array.from(uniqueTags).map((tag) => {
    return (
      <button
        key={tag as string}
        className={`btn ${styles.filterButton} ${tag === activeTag ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => handleTagClick(tag as string)}
      >
        {tag as string}
      </button>
    );
  });

  const filterProducts = (products: ProductProps[], activeTag: string) => {
    if (activeTag === 'all') {
      return products;
    } else {
      return products.filter((product) => product.tags[0] === activeTag);
    }
  };

  return (
    <div id="cards">
      {override ? (
        <div className={styles.Heading}>
          <h2 className={styles.HeadingText}>{title}</h2>
          <button
            className={`btn ${styles.filterButton} ${'all' === activeTag ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={handleAllClick}
          >
            All
          </button>
          {filterButtons}
        </div>
      ) : (
        <div className={styles.Heading}>
          <h2 className={styles.HeadingText}>{title}</h2>
        </div>
      )}
      <div className={styles.cardsGrid}>
        {filterProducts(cardsToShow, activeTag).map((card: any, index: any) => (
          <Card key={index} {...card} redirectionLink={redirectionLink} />
        ))}
      </div>
      <div
        onClick={handleClick}
        className={`body-10 mb-5 mt-2 ${styles.linkText}`}
      >
        {showViewAll && !override && (
          <span className={`link-default ${styles.purple}`}>
            {showAll ? 'Show Less' : viewAllText}
          </span>
        )}
      </div>
    </div>
  );
}
