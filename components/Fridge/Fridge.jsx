'use client'

import { useState } from 'react'
import styles from './Fridge.module.css'
import FoodItem from '@/components/FoodItem/FoodItem'
import { initialFridgeItems } from '@/data/foodItems'

export default function Fridge() {
  const [fridgeOpen, setFridgeOpen] = useState(false)
  const [freezerOpen, setFreezerOpen] = useState(false)

  const topItems = initialFridgeItems.filter(i => i.shelf !== 'freezer')
  const freezerItems = initialFridgeItems.filter(i => i.shelf === 'freezer')

  return (
    <div className={styles.fridgeUnit}>

      {/* TOP FRIDGE SECTION */}
      <div
        className={styles.fridgeTop}
        onClick={() => setFridgeOpen(!fridgeOpen)}
      >
        <div className={`${styles.fridgeInside} ${fridgeOpen ? styles.insideVisible : ''}`}>
          <div className={styles.fridgeLightWrapper}>
            <div className={styles.fridgeLight} />
          </div>
          <div className={styles.shelvesWrapper}>
            <div className={styles.shelf}>
              {topItems.filter(i => i.shelf === 'shelf-1').map(item => (
                <FoodItem key={item.id} {...item} />
              ))}
            </div>
            <div className={styles.shelfDivider} />
            <div className={styles.shelf}>
              {topItems.filter(i => i.shelf === 'shelf-2').map(item => (
                <FoodItem key={item.id} {...item} />
              ))}
            </div>
            <div className={styles.shelfDivider} />
            <div className={styles.shelf}>
              {topItems.filter(i => i.shelf === 'shelf-3').map(item => (
                <FoodItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.doorLeft} ${fridgeOpen ? styles.doorLeftOpen : ''}`}>
          <div className={styles.handleLeft} />
          <div className={styles.doorSeal} />
        </div>

        <div className={`${styles.doorRight} ${fridgeOpen ? styles.doorRightOpen : ''}`}>
          <div className={styles.handleRight} />
          <div className={styles.doorSeal} />
        </div>

        {!fridgeOpen && <div className={styles.doorGap} />}
      </div>

      {/* FREEZER SECTION */}
      <div
        className={styles.freezerSection}
        onClick={() => setFreezerOpen(!freezerOpen)}
      >
        <div className={`${styles.freezerInside} ${freezerOpen ? styles.freezerInsideVisible : ''}`}>
          <div className={styles.freezerLight} />
          <div className={styles.freezerShelf}>
            {freezerItems.map(item => (
              <FoodItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className={`${styles.freezerDoor} ${freezerOpen ? styles.freezerDoorOpen : ''}`}>
          <div className={styles.freezerHandle} />
          <div className={styles.freezerLabel}>Freezer</div>
        </div>
      </div>

    </div>
  )
}