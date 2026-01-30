import styles from "./Card.module.css"; // Assume some basic card styles
import React from "react";

interface IProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ children, title }: IProps) {
  // 'children' will be whatever is put inside <Card>...</Card>
  // 'title' is a regular prop

  return (
    <div className={styles.card}>
      {title && <h2 className={styles.cardTitle}>{title}</h2>}{" "}
      {/* Conditionally render title */}
      <div className={styles.cardContent}>
        {children} {/* Render the content passed inside */}
      </div>
    </div>
  );
}
