import React, { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  )
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = (message: string, type: 'success' | 'error') => {
    const newToast: ToastProps = { message, type }
    setToasts((prevToasts) => [...prevToasts, newToast])
  }

  return {
    Toast: () => (
      <>
        {toasts.map((toast, index) => (
          <Toast key={index} {...toast} />
        ))}
      </>
    ),
    showToast,
  }
}
