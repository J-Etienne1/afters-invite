import { useState, useEffect } from 'react'
import styles from './EasterEgg.module.css'

const NUM_BATS = 18

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function generateBats() {
  return Array.from({ length: NUM_BATS }, (_, i) => ({
    id: i,
    angle: randomBetween(180, 360),        // fly upward/outward from bottom corner
    distance: randomBetween(180, 520),     // how far they travel
    duration: randomBetween(1.2, 2.4),     // flight duration in seconds
    delay: randomBetween(0, 0.5),          // stagger the launch
    size: randomBetween(14, 26),           // bat size in px
    wobble: randomBetween(-35, 35),        // slight arc drift
  }))
}

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const [bats, setBats] = useState([])

  function handleClick() {
    setBats(generateBats())
    setActive(true)
  }

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => setActive(false), 3000)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div className={styles.container}>
      {/* Bat swarm */}
      {active && bats.map((bat) => (
        <div
          key={bat.id}
          className={styles.bat}
          style={{
            '--angle': `${bat.angle}deg`,
            '--distance': `${bat.distance}px`,
            '--duration': `${bat.duration}s`,
            '--delay': `${bat.delay}s`,
            '--wobble': `${bat.wobble}deg`,
            '--size': `${bat.size}px`,
          }}
        >
          <BatSVG />
        </div>
      ))}

      {/* Headstone */}
      <button
        className={styles.headstone}
        onClick={handleClick}
        aria-label="Click the headstone"
        title="..."
      >
        <HeadstoneSVG />
      </button>
    </div>
  )
}

function BatSVG() {
  return (
    <svg
      viewBox="0 0 40 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: 'var(--size)', height: 'auto' }}
    >
      {/* Body */}
      <ellipse cx="20" cy="11" rx="4" ry="3.5" fill="#c4b8bc" />
      {/* Left wing */}
      <path d="M16 11 Q10 4 2 7 Q8 10 14 13 Z" fill="#c4b8bc" />
      {/* Right wing */}
      <path d="M24 11 Q30 4 38 7 Q32 10 26 13 Z" fill="#c4b8bc" />
      {/* Ears */}
      <polygon points="18,8 16,4 20,7" fill="#c4b8bc" />
      <polygon points="22,8 24,4 20,7" fill="#c4b8bc" />
      {/* Eyes */}
      <circle cx="18.5" cy="11" r="1" fill="#8b1a1a" />
      <circle cx="21.5" cy="11" r="1" fill="#8b1a1a" />
    </svg>
  )
}

function HeadstoneSVG() {
  return (
    <svg
      viewBox="0 0 60 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '48px', height: 'auto' }}
    >
      {/* Stone base */}
      <rect x="5" y="62" width="50" height="10" rx="2" fill="#3a2e32" stroke="#5a1010" strokeWidth="0.8" />
      {/* Headstone body */}
      <path d="M10 60 L10 28 Q10 10 30 10 Q50 10 50 28 L50 60 Z" fill="#221820" stroke="#5a1010" strokeWidth="0.8" />
      {/* Cross */}
      <rect x="27" y="20" width="6" height="22" rx="1" fill="#8b1a1a" opacity="0.7" />
      <rect x="20" y="28" width="20" height="5" rx="1" fill="#8b1a1a" opacity="0.7" />
      {/* R.I.P text */}
      <text
        x="30"
        y="56"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="7"
        fill="#7a6e72"
        fontStyle="italic"
      >
        R.I.P
      </text>
    </svg>
  )
}

