'use client'

import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import styles from './Plate.module.css'

export default function Plate({ plateItems, setPlateItems }) {
  const [isOpen, setIsOpen] = useState(false)

  const { setNodeRef, isOver } = useDroppable({
    id: 'plate-dropzone',
  })

  function removeItem(id) {
    setPlateItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className={`${styles.plateWrapper} ${isOpen ? styles.open : ''}`}>

      {/* PEEK LABEL — visible when closed */}
      {!isOpen && (
        <div
          className={styles.peekTrigger}
          onClick={() => setIsOpen(true)}
        >
          <span className={styles.peekLabel}>Plate</span>
          <span className={styles.peekArrow}>‹</span>
        </div>
      )}

      {/* PLATE ITSELF */}
      <div
        ref={setNodeRef}
        className={`${styles.plateOuter} ${isOver ? styles.plateHovered : ''}`}
      >
        {/* rim detail */}
        <div className={styles.plateRim} />

        {/* inner well */}
        <div className={styles.plateInner}>
          {plateItems.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🍽️</span>
              {isOpen && (
                <span className={styles.emptyText}>Drop food{'\n'}here</span>
              )}
            </div>
          ) : (
            <div className={styles.itemsGrid}>
              {plateItems.map((item) => (
                <button
                  key={item.id}
                  className={styles.plateItem}
                  onClick={() => removeItem(item.id)}
                  title={`Remove ${item.name}`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* plate label at bottom */}
        <span className={styles.plateLabel}>Plate</span>
      </div>

      {/* CONTROLS — visible when open */}
      {isOpen && (
        <div className={styles.controls}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          {plateItems.length > 0 && (
            <button
              className={styles.recipeBtn}
              onClick={() => setPlateItems([])}
            >
              Generate Recipe ✨
            </button>
          )}
        </div>
      )}

    </div>
  )
}