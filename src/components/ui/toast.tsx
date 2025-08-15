"use client"

import { createContext, useContext, useState, useCallback } from 'react'

export type Toast = { id: number; title?: string; description?: string }

type ToastContextType = {
  toasts: Toast[]
  show: (t: Omit<Toast, 'id'>) => void
  remove: (id: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const remove = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), [])
  const show = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts(prev => [...prev, { id, ...t }])
    setTimeout(() => remove(id), 3500)
  }, [remove])

  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 shadow-xl rounded-md p-3 min-w-[240px]">
            {t.title && <div className="font-medium text-gray-900 mb-1">{t.title}</div>}
            {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}