import { useState, useEffect } from 'react'
import styles from './BloodRain.module.css'

const NUM_DROPS = 40

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function generateDrops() {
  return Array.from({ length: NUM_DROPS }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    delay: randomBetween(0, 1.5),
    duration: randomBetween(1.5, 3),
    width: randomBetween(2, 4),
    height: randomBetween(15, 40),
    opacity: randomBetween(0.4, 0.9),
  }))
}

export default function BloodRain({ active, onComplete }) {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    if (!active) return
    setDrops(generateDrops())
    const timer = setTimeout(() => onComplete(), 4000)
    return () => clearTimeout(timer)
  }, [active, onComplete])

  if (!active) return null

  return (
    <div className={styles.overlay} aria-hidden="true">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className={styles.drop}
          style={{
            '--drop-left': `${drop.left}%`,
            '--drop-delay': `${drop.delay}s`,
            '--drop-duration': `${drop.duration}s`,
            '--drop-width': `${drop.width}px`,
            '--drop-height': `${drop.height}px`,
            '--drop-opacity': drop.opacity,
          }}
        />
      ))}
    </div>
  )
}
