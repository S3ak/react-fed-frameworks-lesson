import styles from "./Aside.module.css";

function Aside({ children }: { children: React.ReactNode }) {
  return <aside className={styles.aside}>{children}</aside>;
}

export default Aside;
