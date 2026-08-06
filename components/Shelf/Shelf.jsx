import FoodItem from '@/components/FoodItem/FoodItem'
import styles from './Shelf.module.css'

export default function Shelf({ id, label, items = [] }) {
  return (
    <div className={styles.shelfWrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.shelf}>
        {items.map(item => (
          <FoodItem
            key={item.id}
            emoji={item.emoji}
            name={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  )
}