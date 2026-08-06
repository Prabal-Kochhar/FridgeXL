'use client'

import ListPage from '@/components/ListPage/ListPage'
import { useState, useEffect } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import TopBar from '@/components/TopBar/TopBar'
import Fridge from '@/components/Fridge/Fridge'
import Plate from '@/components/Plate/Plate'
import Bin from '@/components/Bin/Bin'
import PopularDishes from '@/components/PopularDishes/PopularDishes'
import BottomNav from '@/components/BottomNav/BottomNav'
import FoodItem from '@/components/FoodItem/FoodItem'
import styles from './page.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [plateItems, setPlateItems] = useState([])
  const [activeDragItem, setActiveDragItem] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleDragStart(event) {
    setActiveDragItem(event.active.data.current)
  }

  function handleDragEnd(event) {
    const { over, active } = event
    if (over && over.id === 'plate-dropzone') {
      const item = active.data.current
      const alreadyOnPlate = plateItems.find(i => i.id === item.id)
      if (!alreadyOnPlate) {
        setPlateItems(prev => [...prev, item])
      }
    }
    setActiveDragItem(null)
  }

  if (!mounted) return null

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.appShell}>
        <div className={styles.mobileContainer}>
          <TopBar />
          <div className={styles.scrollArea}>
            {activeTab === 'home' && (
              <div className={styles.mainScene}>
                <div className={styles.fridgeSection}>
                  <Fridge />
                  <Bin />
                  <Plate plateItems={plateItems} setPlateItems={setPlateItems} />
                </div>
                <div className={styles.floor} />
                <div className={styles.floorShadow} />
                <PopularDishes />
              </div>
            )}
            {activeTab === 'list' && <ListPage />}
          </div>
          
          
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <DragOverlay>
        {activeDragItem ? (
          <FoodItem
            id={activeDragItem.id}
            name={activeDragItem.name}
            emoji={activeDragItem.emoji}
            quantity={activeDragItem.quantity}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}