import Image from 'next/image'
import styles from './TopBar.module.css'

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.logo}>
        <span className={styles.logoFridge}>Fridge</span>
        <span className={styles.logoXL}>XL</span>
      </div>
      <Image
  src="/logo.png"
  alt="FridgeXL mascot"
  width={90}
  height={90}
  className={styles.mascot}
  priority
/>
    </div>
  )
}