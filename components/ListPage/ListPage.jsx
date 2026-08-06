import styles from './ListPage.module.css'

export default function ListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>🛒</span>
        <h1 className={styles.title}>Shopping List</h1>
        <p className={styles.subtitle}>Your items will appear here</p>
      </div>
    </div>
  )
}