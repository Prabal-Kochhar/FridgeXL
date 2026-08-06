'use client'

import { useRef } from 'react'
import styles from './PopularDishes.module.css'

const dishes = [
  { id: 1, name: 'Eggs Benedict', emoji: '🍳', time: '20 min', difficulty: 'Easy', cal: '420 cal' },
  { id: 2, name: 'Caesar Salad', emoji: '🥗', time: '15 min', difficulty: 'Easy', cal: '280 cal' },
  { id: 3, name: 'Grilled Cheese', emoji: '🧀', time: '10 min', difficulty: 'Easy', cal: '380 cal' },
  { id: 4, name: 'Chicken Stir Fry', emoji: '🍗', time: '25 min', difficulty: 'Medium', cal: '520 cal' },
  { id: 5, name: 'Omelette', emoji: '🥚', time: '10 min', difficulty: 'Easy', cal: '310 cal' },
  { id: 6, name: 'Pasta Carbonara', emoji: '🍝', time: '30 min', difficulty: 'Medium', cal: '640 cal' },
  { id: 7, name: 'Avocado Toast', emoji: '🥑', time: '10 min', difficulty: 'Easy', cal: '290 cal' },
  { id: 8, name: 'Chicken Soup', emoji: '🍲', time: '45 min', difficulty: 'Medium', cal: '340 cal' },
]

export default function PopularDishes() {
  const rowRef = useRef(null)

  function scrollLeft() {
    rowRef.current?.scrollBy({ left: -150, behavior: 'smooth' })
  }

  function scrollRight() {
    rowRef.current?.scrollBy({ left: 150, behavior: 'smooth' })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.icon}>🍴</span>
        <span className={styles.title}>Popular Dishes</span>
        <span className={styles.pill}>{dishes.length}</span>
      </div>

      <div className={styles.rowWrapper}>
        <button className={styles.arrowLeft} onClick={scrollLeft}>‹</button>

        <div className={styles.cardRow} ref={rowRef}>
          {dishes.map(dish => (
            <div key={dish.id} className={styles.card}>
              <div className={styles.emojiBox}>{dish.emoji}</div>
              <div className={styles.cardBody}>
                <span className={styles.cardName}>{dish.name}</span>
                <span className={styles.cardMeta}>{dish.time} · {dish.cal}</span>
                <span className={`${styles.badge} ${styles[dish.difficulty.toLowerCase()]}`}>
                  {dish.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.arrowRight} onClick={scrollRight}>›</button>
      </div>
    </div>
  )
}