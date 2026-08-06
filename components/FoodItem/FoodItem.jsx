'use client'

import { useDraggable } from '@dnd-kit/core'
import styles from './FoodItem.module.css'

export default function FoodItem({ id, emoji, name, quantity, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isActiveDrag } = useDraggable({
    id: id,
    data: { id, emoji, name, quantity },
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.item} ${isActiveDrag || isDragging ? styles.dragging : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.quantity}>x{quantity}</span>
      </div>
    </div>
  )
}