'use client';

import { useState } from 'react';
import Card from './Card';
import styles from './CardsGrid.module.css';

export default function CardsGrid({
  params,
  title,
  viewAllText,
  redirectionLink,
}: CardsGridProps) {
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const cardsToShow = showAll ? params : params.slice(0, 3);

  const showViewAll = params.length > 3;

  return (
    <div id="cards">
      <div className={styles.Heading}>
        <h2 className={styles.HeadingText}>{title}</h2>
      </div>
      <div className={styles.cardsGrid}>
        {cardsToShow.map((card, index) => (
          <Card key={index} {...card} redirectionLink={redirectionLink} />
        ))}
      </div>
      <div
        onClick={handleClick}
        className={`body-10 mb-5 mt-2 ${styles.linkText}`}
      >
        {showViewAll && (
          <span className={`link-default ${styles.purple}`}>
            {showAll ? 'Show Less' : viewAllText}
          </span>
        )}
      </div>
    </div>
  );
}
