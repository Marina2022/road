// src/app/error.tsx
'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global error caught:', error)
  }, [error])

  return null // Пусто = ничего не покажет
}