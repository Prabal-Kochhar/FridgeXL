'use client'

import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import styles from './Bin.module.css'

export default function Bin() {
  const [isOpen, setIsOpen] = useState(false)
  const [binItems, setBinItems] = useState([
    { id: 'b1', emoji: '🥛', name: 'Milk', daysLeft: 1 },
    { id: 'b2', emoji: '🥬', name: 'Lettuce', daysLeft: 0 },
    { id: 'b3', emoji: '🫙', name: 'Yogurt', daysLeft: 2 },
  ])

  const { setNodeRef, isOver } = useDroppable({ id: 'bin-dropzone' })
  const expiringCount = binItems.filter(i => i.daysLeft <= 1).length

  function removeItem(id) {
    setBinItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className={styles.binContainer}>

      {/* PANEL — opens upward */}
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Expiring Soon</span>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className={styles.itemsList}>
            {binItems.length === 0 ? (
              <span className={styles.emptyText}>All fresh! 🎉</span>
            ) : (
              binItems.map(item => (
                <div
                  key={item.id}
                  className={`${styles.binItem} ${item.daysLeft === 0 ? styles.expired : item.daysLeft === 1 ? styles.urgent : styles.soon}`}
                >
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemDays}>
                      {item.daysLeft === 0 ? 'Expired' : `${item.daysLeft}d left`}
                    </span>
                  </div>
                  <button
                    className={styles.tossBtn}
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id) }}
                  >
                    Toss
                  </button>
                </div>
              ))
            )}
          </div>
          {binItems.length > 0 && (
            <button className={styles.clearBtn} onClick={() => setBinItems([])}>
              Clear all
            </button>
          )}
        </div>
      )}

      {/* BIN VISUAL */}
      <div
        ref={setNodeRef}
        className={`${styles.binOuter} ${isOver ? styles.binHovered : ''} ${isOpen ? styles.binActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* glow ring when expiring items */}
        {expiringCount > 0 && <div className={styles.glowRing} />}

        {/* lid */}
        <div className={`${styles.lid} ${isOver || isOpen ? styles.lidTilted : ''}`}>
          <div className={styles.lidHandle} />
        </div>

        {/* body */}
        <div className={styles.binBody}>
          <div className={styles.binReflection} />
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.binRidge} />
          ))}
          <div className={styles.binFooter}>
            <span className={styles.binLabelText}>The Bin</span>
          </div>
        </div>

        {/* badge */}
        {expiringCount > 0 && (
          <span className={styles.badge}>{expiringCount}</span>
        )}
      </div>

    </div>
  )
}