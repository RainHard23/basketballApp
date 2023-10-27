import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNotification } from './useNotification'
import { AppRootStateType } from '../../../core/redux/store'
import { colors } from '../../../assests/styles/colors'

export const Notification = (): JSX.Element | null => {
  const notification = useSelector((state: AppRootStateType) => state.notification)
  const { clearNotification } = useNotification()

  // Эффект для автоматического закрытия уведомления через 5 секунд
  useEffect(() => {
    // Если уведомление открыто, устанавливаем таймер
    if (notification.open) {
      const timer = setTimeout(() => {
        clearNotification()
      }, 5000) // 5000 миллисекунд = 5 секунд

      // Эта функция будет вызвана, когда компонент размонтируется или перед тем, как эффект будет повторно запущен
      // Она очищает таймер, предотвращая выполнение кода таймера, если компонент был размонтирован
      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification.open, clearNotification]) // Зависимости эффекта, эффект будет повторно запущен, если эти значения изменятся

  if (!notification.open) {
    return null
  }

  const notificationStyles = {
    backgroundColor:
      notification.type === 'success'
        ? 'green'
        : notification.type === 'error'
        ? colors.lightestRed
        : '#333',
    color: 'white',
    padding: '12px',
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    zIndex: 1000,
    borderRadius: '4px',
    boxShadow:
      '0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '450px',
    width: '100%',
  }

  // Мы удалили кнопку, поэтому теперь здесь только сообщение
  return (
    <div style={notificationStyles}>
      <div>{notification.message}</div>
    </div>
  )
}
