import React from "react";
import styles from "./EventCard.module.css";

function EventCard({
  children,
  title,
  date,
  location,
}: {
  children?: React.ReactNode;
  title: string;
  date: string;
  location: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{children}</div>
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden="true">
              📅
            </span>
            <span>Dato: {date}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden="true">
              📍
            </span>
            <span>Sted: {location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
