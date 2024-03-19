'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import styles from './CardsGrid.module.css';

export default async function CardsGrid({
  params,
  title,
  viewAllText,
  override,
  redirectionLink,
}: CardsGridProps) {
  const products = params;
  let tags;
  if (override) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/categories`,
      {
        method: 'POST',
        body: JSON.stringify(products),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );
    const data = (await res.json()) as ProductResProps;
    tags = data.productTags;
  }
  const [showAll, setShowAll] = useState(override || false);
  const [activeTag, setActiveTag] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const cardsToShow = showAll ? products : products.slice(0, 3);
  const showViewAll = products.length > 3;

  const handleAllClick = () => {
    setActiveTag('all');
  };

  const handleTagClick = (tag: string) => {
    setActiveTag((currentTag) => {
      return tag;
    });
  };

  const filterButtons = tags?.map((tag) => {
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

  const filterProducts = async (activeTag: string) => {
    if (activeTag === 'all') {
      setFilteredProducts(cardsToShow);
    } else {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${activeTag}`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(products),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const data = await res.json();

      const filteredProductIndexes = data.productIndexes;
      const filteredProducts = cardsToShow.filter((product, index) =>
        filteredProductIndexes.includes(index),
      );
      setFilteredProducts(filteredProducts);
    }
  };

  useEffect(() => {
    filterProducts(activeTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

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
        {override
          ? filteredProducts.map((card: ProductProps, index: number) => (
              <Card key={index} {...card} redirectionLink={redirectionLink} />
            ))
          : cardsToShow.map((card: any, index: any) => (
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
