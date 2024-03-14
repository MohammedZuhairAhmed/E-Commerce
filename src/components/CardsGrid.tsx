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

  const filterMap = new Map<string, ProductProps[]>();

  cardsToShow.forEach((product) => {
    const tag = product.tags[0];
    const products = filterMap.get(tag) || [];
    products.push(product);
    filterMap.set(tag, products);
  });

  const tags = Array.from(filterMap.keys());

  const handleAllClick = () => {
    setActiveTag('all');
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const filterButtons = tags.map((tag) => {
    return (
      <button
        key={tag}
        className={`btn ${styles.filterButton} ${tag === activeTag ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => handleTagClick(tag)}
      >
        {tag}
      </button>
    );
  });

  const filterProducts = (activeTag: string) => {
    return filterMap.get(activeTag);
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
        {activeTag === 'all'
          ? cardsToShow.map((card: any, index: any) => (
              <Card key={index} {...card} redirectionLink={redirectionLink} />
            ))
          : filterProducts(activeTag)?.map(
              (card: ProductProps, index: number) => (
                <Card key={index} {...card} redirectionLink={redirectionLink} />
              ),
            )}
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
